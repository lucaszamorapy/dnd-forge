export const resetPasswordTemplate = (name: string, codeVerification: number) => {
  const codeString = String(codeVerification)
  const digits = codeString.split('')
  const currentYear = new Date().getFullYear();

  const digitBoxes = digits.map(d => `
    <span style="
      display: inline-block;
      width: 44px; height: 54px;
      background: #1d171f;
      border: 1.5px solid #f1b000;
      border-radius: 8px;
      font-size: 28px;
      font-weight: 700;
      color: #f1b000;
      line-height: 54px;
      text-align: center;
    ">${d}</span>
  `).join('')

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin:0; padding:0; background:#f4f4f4; font-family: Arial, sans-serif;">
        <div style="max-width:600px; margin:40px auto;">

          <div style="background:#1d171f; padding:28px 24px; border-radius:8px 8px 0 0; text-align:center;">
            <p style="color:#f1b000; font-size:22px; font-weight:700; margin:0;">D&D Forge</p>
            <p style="color:#f1b000cc; font-size:13px; margin:4px 0 0;">Redefinição de senha</p>
          </div>

          <div style="background:#fff; padding:32px 24px;">
            <div style="text-align:center; margin-bottom:24px;">
              <div style="width:64px; height:64px; border-radius:50%; background:#1d171f; display:inline-flex; align-items:center; justify-content:center;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C9.24 2 7 4.24 7 7v1H5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-2V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v1H9V7c0-1.66 1.34-3 3-3zm0 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" fill="#f1b000"/>
                </svg>
              </div>
            </div>

            <p style="color:#1f2937; font-size:18px; font-weight:700; margin:0 0 10px;">Olá, ${name}!</p>
            <p style="color:#4b5563; font-size:14px; line-height:1.6; margin:0 0 24px;">Use o código abaixo para redefinir sua senha. Digite-o na tela de verificação.</p>

            <div style="background:#1d171f; border:2px dashed #f1b000; border-radius:12px; padding:24px; text-align:center; margin:0 0 24px;">
              <p style="color:#f1b000; font-size:11px; font-weight:600; letter-spacing:2px; text-transform:uppercase; margin:0 0 12px;">Seu código de verificação</p>
              <div style="display:flex; justify-content:center; gap:10px;">
                ${digitBoxes}
              </div>
            </div>

            <div style="background:#fff7ed; border-left:4px solid #f1b000; padding:12px 16px; border-radius:0 6px 6px 0;">
              <p style="color:#9a3412; font-size:13px; margin:0;">⚠️ Este código expira em <strong>30 minutos</strong> e só pode ser usado uma vez. Caso não tenha solicitado, ignore este e-mail.</p>
            </div>
          </div>

          <div style="background:#1d171f; border-radius:0 0 8px 8px; padding:16px 24px; text-align:center; border-top:1px solid #f1b00033;">
            <p style="color:#f1b000cc; font-size:11px; margin:0;">© ${currentYear} Taverna do Barik. Todos os direitos reservados.</p>
            <p style="color:#f1b000cc; font-size:11px; margin:4px 0 0;">Você está recebendo este e-mail pois solicitou a redefinição de senha.</p>
          </div>

        </div>
      </body>
    </html>
  `
}