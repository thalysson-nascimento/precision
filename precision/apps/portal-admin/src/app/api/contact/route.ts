import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@precision/database';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, country, description } = await request.json();

    // 1. Validations
    if (!name || !email || !phone || !country || !description) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios para enviar a mensagem.' },
        { status: 400 }
      );
    }

    // 2. Save message to database
    console.log('[Contact API] Salvando mensagem no banco de dados...');
    const message = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        country,
        description,
      },
    });
    console.log('[Contact API] Mensagem salva com ID:', message.id);

    // 3. Send Email Notification
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipientEmail = 'precisionmanagement.hr@gmail.com';

    if (smtpUser && smtpPass) {
      console.log('[Contact API] Enviando notificação por e-mail...');
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailOptions = {
          from: `"Precision Site" <${smtpUser}>`,
          to: recipientEmail,
          subject: `[Precision Contato] Nova mensagem de ${name}`,
          text: `Olá,\n\nVocê recebeu uma nova mensagem de contato através do formulário do site Precision.\n\nDetalhes do contato:\n- Nome: ${name}\n- E-mail: ${email}\n- Telefone: ${phone}\n- País: ${country}\n- Mensagem/Assunto: ${description}\n\nAtenciosamente,\nSistema Precision`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <h2 style="color: #2563eb; margin-top: 0;">Nova Mensagem de Contato</h2>
              <p>Olá,</p>
              <p>Você recebeu uma nova mensagem de contato através do formulário do site Precision.</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 120px;">Nome:</td>
                  <td style="padding: 8px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">E-mail:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Telefone:</td>
                  <td style="padding: 8px 0;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">País:</td>
                  <td style="padding: 8px 0;">${country}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Mensagem:</td>
                  <td style="padding: 8px 0; white-space: pre-wrap;">${description}</td>
                </tr>
              </table>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #666; margin-bottom: 0;">Esta é uma mensagem automática enviada pelo sistema de contato da Precision.</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log('[Contact API] E-mail enviado com sucesso para:', recipientEmail);
      } catch (emailError: any) {
        console.error('[Contact API] Erro ao enviar e-mail:', emailError.message);
      }
    } else {
      console.warn('[Contact API] SMTP_USER ou SMTP_PASS não configurados. Notificação por e-mail ignorada.');
    }

    // 4. Send WhatsApp Notification
    // We support CallMeBot (easy and free for personal notifications) and custom API gateways
    const callmebotKey = process.env.CALLMEBOT_API_KEY;
    const personalPhone = '+5583996955484';
    const whatsappApiUrl = process.env.WHATSAPP_API_URL;
    const whatsappApiToken = process.env.WHATSAPP_API_TOKEN;

    const waText = `*Nova mensagem de contato - Precision*\n\n*Nome:* ${name}\n*E-mail:* ${email}\n*Telefone:* ${phone}\n*País:* ${country}\n*Mensagem:* ${description}`;

    if (callmebotKey) {
      console.log('[Contact API] Enviando notificação de WhatsApp via CallMeBot...');
      try {
        const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(personalPhone)}&text=${encodeURIComponent(waText)}&apikey=${callmebotKey}`;
        const response = await fetch(url);
        if (response.ok) {
          console.log('[Contact API] Notificação de WhatsApp via CallMeBot enviada com sucesso.');
        } else {
          console.error('[Contact API] CallMeBot retornou status inválido:', response.status);
        }
      } catch (waError: any) {
        console.error('[Contact API] Erro ao enviar WhatsApp via CallMeBot:', waError.message);
      }
    } else if (whatsappApiUrl && whatsappApiToken) {
      console.log('[Contact API] Enviando notificação de WhatsApp via Gateway customizado...');
      try {
        const response = await fetch(whatsappApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': whatsappApiToken,
            'Authorization': `Bearer ${whatsappApiToken}`
          },
          body: JSON.stringify({
            number: personalPhone.replace('+', ''),
            message: waText,
            text: waText
          })
        });
        if (response.ok) {
          console.log('[Contact API] Notificação de WhatsApp via Gateway customizado enviada com sucesso.');
        } else {
          console.error('[Contact API] Gateway de WhatsApp retornou status inválido:', response.status);
        }
      } catch (waError: any) {
        console.error('[Contact API] Erro ao enviar WhatsApp via Gateway customizado:', waError.message);
      }
    } else {
      console.warn('[Contact API] CALLMEBOT_API_KEY ou WHATSAPP_API_URL não configurados. Notificação de WhatsApp ignorada.');
    }

    return NextResponse.json({
      success: true,
      message: 'sua mensagem foi enviada com sucesso, em breve retornaremos'
    });
  } catch (error: any) {
    console.error('[Contact API] Erro no endpoint de contato:', error);
    return NextResponse.json(
      { error: 'Desculpe, ocorreu um erro interno ao processar sua mensagem.' },
      { status: 500 }
    );
  }
}
