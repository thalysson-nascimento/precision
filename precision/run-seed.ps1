$sqlite = "C:\Users\thalysson\AppData\Local\Android\Sdk\platform-tools\sqlite3.exe"
$db = "c:\Users\thalysson\projetos\chronos\precision\prisma\dev.db"

$empMain    = "e4315502-735a-4180-bf03-bdac4b04e4f1"
$empCarlos  = "488d30fe-d6a1-4d40-9548-b904be7a3698"
$empAna     = "c9f2a970-1e25-4974-9860-efe55fa6714f"
$empFernando= "984cdc76-c640-40c3-b4ad-e4e659be13cb"
$empMariana = "81934aa8-23e9-4a07-bb6b-50562970fd76"
$empJoao    = "dd3ad1c4-2a4e-48f9-9c0d-d9559c26bc3e"
$empRoberto = "eea8ac11-435d-4a12-8013-764eed4ea932"
$empLuciana = "3e369ef3-884b-4598-a4f5-d1206f705dc9"
$empPaulo   = "07d0fe43-2565-40f3-9afd-c6549ab9b87b"

$today = "2026-06-26"

# Gerar registros para Thalysson (Jan-Jun 2026)
$mainRecords = @()
$startYear = 2026

for ($m = 0; $m -le 5; $m++) {
    $daysInMonth = [DateTime]::DaysInMonth($startYear, $m + 1)
    for ($day = 1; $day -le $daysInMonth; $day++) {
        $monthStr = "{0:D2}" -f ($m + 1)
        $dayStr   = "{0:D2}" -f $day
        $dateStr  = "$startYear-$monthStr-$dayStr"

        if ($dateStr -gt $today) { continue }

        $dt = [DateTime]::new($startYear, $m + 1, $day)
        $dow = [int]$dt.DayOfWeek  # 0=Sun, 6=Sat

        if ($dow -eq 0 -or $dow -eq 6) { continue }

        if ($dateStr -eq $today) {
            $mainRecords += "('$([System.Guid]::NewGuid())', '$empMain', '$dateStr', 'IN', '08:00', 1)"
            continue
        }

        $isIncomplete = ($day % 7 -eq 0) -or ($day % 11 -eq 0)

        if ($isIncomplete) {
            $mainRecords += "('$([System.Guid]::NewGuid())', '$empMain', '$dateStr', 'IN', '08:05', 1)"
            $mainRecords += "('$([System.Guid]::NewGuid())', '$empMain', '$dateStr', 'LUNCH_OUT', '12:02', 1)"
        } else {
            $offsetIn = (Get-Random -Minimum -5 -Maximum 5)
            if ($offsetIn -lt 0) { $timeIn = "07:{0:D2}" -f (60 + $offsetIn) }
            else { $timeIn = "08:{0:D2}" -f $offsetIn }

            $offsetOut = (Get-Random -Minimum -5 -Maximum 5)
            if ($offsetOut -lt 0) { $timeOut = "17:{0:D2}" -f (60 + $offsetOut) }
            else { $timeOut = "18:{0:D2}" -f $offsetOut }

            $mainRecords += "('$([System.Guid]::NewGuid())', '$empMain', '$dateStr', 'IN', '$timeIn', 1)"
            $mainRecords += "('$([System.Guid]::NewGuid())', '$empMain', '$dateStr', 'LUNCH_OUT', '12:05', 1)"
            $mainRecords += "('$([System.Guid]::NewGuid())', '$empMain', '$dateStr', 'LUNCH_IN', '13:03', 1)"
            $mainRecords += "('$([System.Guid]::NewGuid())', '$empMain', '$dateStr', 'OUT', '$timeOut', 1)"
        }
    }
}

Write-Host "Total registros Thalysson: $($mainRecords.Count)"

# Inserir em blocos de 50
$batchSize = 50
for ($i = 0; $i -lt $mainRecords.Count; $i += $batchSize) {
    $batch = $mainRecords[$i..([Math]::Min($i + $batchSize - 1, $mainRecords.Count - 1))]
    $values = $batch -join ",`n"
    $sql = "INSERT OR IGNORE INTO TimeRecord (id, employeeId, date, type, time, confirmed) VALUES`n$values;"
    & $sqlite $db $sql
}

Write-Host "Registros Thalysson inseridos!"

# Registros da semana atual para a equipe (22-26 Jun 2026)
$weekDays = @("2026-06-22", "2026-06-23", "2026-06-24", "2026-06-25", "2026-06-26")
$teamRecords = @()

foreach ($dateStr in $weekDays) {
    # Carlos Souza - presente todos os dias
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empCarlos', '$dateStr', 'IN', '08:02', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empCarlos', '$dateStr', 'LUNCH_OUT', '12:00', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empCarlos', '$dateStr', 'LUNCH_IN', '13:00', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empCarlos', '$dateStr', 'OUT', '18:00', 1)"

    # Ana Lima - presente todos os dias
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empAna', '$dateStr', 'IN', '07:58', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empAna', '$dateStr', 'LUNCH_OUT', '12:15', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empAna', '$dateStr', 'LUNCH_IN', '13:15', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empAna', '$dateStr', 'OUT', '18:05', 1)"

    # Fernando Costa - atraso na Sexta 26/06
    $fcInTime = if ($dateStr -eq "2026-06-26") { "09:30" } else { "08:05" }
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empFernando', '$dateStr', 'IN', '$fcInTime', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empFernando', '$dateStr', 'LUNCH_OUT', '12:00', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empFernando', '$dateStr', 'LUNCH_IN', '13:00', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empFernando', '$dateStr', 'OUT', '18:00', 1)"

    # Mariana Silva - presente todos os dias
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empMariana', '$dateStr', 'IN', '07:55', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empMariana', '$dateStr', 'LUNCH_OUT', '12:00', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empMariana', '$dateStr', 'LUNCH_IN', '13:00', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empMariana', '$dateStr', 'OUT', '18:00', 1)"

    # Joao Pedro - presente todos os dias
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empJoao', '$dateStr', 'IN', '07:50', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empJoao', '$dateStr', 'LUNCH_OUT', '12:00', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empJoao', '$dateStr', 'LUNCH_IN', '13:00', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empJoao', '$dateStr', 'OUT', '18:00', 1)"

    # Roberto Mendes - faltou bater saida na Terca 23/06
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empRoberto', '$dateStr', 'IN', '08:00', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empRoberto', '$dateStr', 'LUNCH_OUT', '12:00', 1)"
    $teamRecords += "('$([System.Guid]::NewGuid())', '$empRoberto', '$dateStr', 'LUNCH_IN', '13:00', 1)"
    if ($dateStr -ne "2026-06-23") {
        $teamRecords += "('$([System.Guid]::NewGuid())', '$empRoberto', '$dateStr', 'OUT', '18:00', 1)"
    }

    # Luciana Tavares - atestado na Quarta 24/06
    if ($dateStr -ne "2026-06-24") {
        $teamRecords += "('$([System.Guid]::NewGuid())', '$empLuciana', '$dateStr', 'IN', '08:00', 1)"
        $teamRecords += "('$([System.Guid]::NewGuid())', '$empLuciana', '$dateStr', 'LUNCH_OUT', '12:00', 1)"
        $teamRecords += "('$([System.Guid]::NewGuid())', '$empLuciana', '$dateStr', 'LUNCH_IN', '13:00', 1)"
        $teamRecords += "('$([System.Guid]::NewGuid())', '$empLuciana', '$dateStr', 'OUT', '18:00', 1)"
    }

    # Paulo Roberto - ajuste manual pendente na Quarta 24/06 (sem IN nesse dia)
    if ($dateStr -eq "2026-06-24") {
        $teamRecords += "('$([System.Guid]::NewGuid())', '$empPaulo', '$dateStr', 'LUNCH_OUT', '12:00', 1)"
        $teamRecords += "('$([System.Guid]::NewGuid())', '$empPaulo', '$dateStr', 'LUNCH_IN', '13:00', 1)"
        $teamRecords += "('$([System.Guid]::NewGuid())', '$empPaulo', '$dateStr', 'OUT', '18:00', 1)"
    } else {
        $teamRecords += "('$([System.Guid]::NewGuid())', '$empPaulo', '$dateStr', 'IN', '08:00', 1)"
        $teamRecords += "('$([System.Guid]::NewGuid())', '$empPaulo', '$dateStr', 'LUNCH_OUT', '12:00', 1)"
        $teamRecords += "('$([System.Guid]::NewGuid())', '$empPaulo', '$dateStr', 'LUNCH_IN', '13:00', 1)"
        $teamRecords += "('$([System.Guid]::NewGuid())', '$empPaulo', '$dateStr', 'OUT', '18:00', 1)"
    }
}

Write-Host "Total registros equipe: $($teamRecords.Count)"

# Inserir registros da equipe
for ($i = 0; $i -lt $teamRecords.Count; $i += $batchSize) {
    $batch = $teamRecords[$i..([Math]::Min($i + $batchSize - 1, $teamRecords.Count - 1))]
    $values = $batch -join ",`n"
    $sql = "INSERT OR IGNORE INTO TimeRecord (id, employeeId, date, type, time, confirmed) VALUES`n$values;"
    & $sqlite $db $sql
}

Write-Host "Registros da equipe inseridos!"

# Inserir ajustes pendentes
$adjId1 = [System.Guid]::NewGuid().ToString()
$adjId2 = [System.Guid]::NewGuid().ToString()
$adjId3 = [System.Guid]::NewGuid().ToString()

$adjSql = @"
INSERT OR IGNORE INTO TimeAdjustment (id, employeeId, date, type, time, justification, attachment, status, createdAt) VALUES
  ('$adjId1', '$empRoberto', '2026-06-23', 'ESQUECIMENTO DE SAIDA', '18:00', 'Fiquei trabalhando ate mais tarde no projeto X e esqueci de bater o ponto na saida.', NULL, 'PENDING', '2026-06-23 19:00:00'),
  ('$adjId2', '$empLuciana', '2026-06-24', 'ATESTADO MEDICO', NULL, 'Consulta odontologica de rotina na quarta-feira pela manha.', 'atestado_2410.pdf', 'PENDING', '2026-06-24 14:30:00'),
  ('$adjId3', '$empPaulo', '2026-06-24', 'AJUSTE MANUAL INICIO', '08:15', 'O aplicativo movel falhou ao carregar a geolocalizacao no momento de registrar a entrada.', NULL, 'PENDING', '2026-06-24 08:30:00');
"@
& $sqlite $db $adjSql

Write-Host "Ajustes inseridos!"

# Inserir Teams
$teamSql = @"
INSERT OR IGNORE INTO Team (id, name, createdAt) VALUES
  ('$([System.Guid]::NewGuid())', 'Desenvolvimento', datetime('now')),
  ('$([System.Guid]::NewGuid())', 'Design', datetime('now')),
  ('$([System.Guid]::NewGuid())', 'Recursos Humanos', datetime('now')),
  ('$([System.Guid]::NewGuid())', 'Vendas', datetime('now')),
  ('$([System.Guid]::NewGuid())', 'Suporte de TI', datetime('now'));
"@
& $sqlite $db $teamSql
Write-Host "Teams inseridos!"

# Inserir Companies
$companySql = @"
INSERT OR IGNORE INTO Company (id, name, address, number, contact, createdAt) VALUES
  ('$([System.Guid]::NewGuid())', 'Precision Matriz', 'Av. Paulista', '1000', 'contato@precision.com.br', datetime('now')),
  ('$([System.Guid]::NewGuid())', 'Precision Filial Sul', 'Rua das Flores', '45', 'filial.sul@precision.com.br', datetime('now')),
  ('$([System.Guid]::NewGuid())', 'Precision Filial Nordeste', 'Av. Beira Mar', '200', 'filial.ne@precision.com.br', datetime('now'));
"@
& $sqlite $db $companySql
Write-Host "Companies inseridas!"

# Inserir JobRoles
$jobRoleSql = @"
INSERT OR IGNORE INTO JobRole (id, name, createdAt) VALUES
  ('$([System.Guid]::NewGuid())', 'Desenvolvedor Senior', datetime('now')),
  ('$([System.Guid]::NewGuid())', 'Desenvolvedor Pleno', datetime('now')),
  ('$([System.Guid]::NewGuid())', 'Analista de Operacoes', datetime('now')),
  ('$([System.Guid]::NewGuid())', 'Executiva de Vendas', datetime('now')),
  ('$([System.Guid]::NewGuid())', 'Suporte de TI', datetime('now')),
  ('$([System.Guid]::NewGuid())', 'Coordenadora de RH', datetime('now'));
"@
& $sqlite $db $jobRoleSql
Write-Host "JobRoles inseridos!"

# Verificar contagens
Write-Host "`n=== VERIFICACAO FINAL ==="
& $sqlite $db "SELECT 'Employees: ' || COUNT(*) FROM Employee;"
& $sqlite $db "SELECT 'TimeRecords: ' || COUNT(*) FROM TimeRecord;"
& $sqlite $db "SELECT 'TimeAdjustments: ' || COUNT(*) FROM TimeAdjustment;"
& $sqlite $db "SELECT 'Teams: ' || COUNT(*) FROM Team;"
& $sqlite $db "SELECT 'Companies: ' || COUNT(*) FROM Company;"
& $sqlite $db "SELECT 'JobRoles: ' || COUNT(*) FROM JobRole;"

Write-Host "`nSeed concluido com sucesso!"
