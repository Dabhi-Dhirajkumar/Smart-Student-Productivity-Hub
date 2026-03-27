const getEmailTemplate = (title, name, messageBody) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: 'Inter', Arial, sans-serif; background-color: #0d0d0d; color: #e5e5e5; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 40px auto; background-color: #1a1a1a; border-radius: 12px; overflow: hidden; border: 1px solid #333; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
      .header { background: linear-gradient(135deg, #a855f7 0%, #d946ef 100%); padding: 30px; text-align: center; }
      .header h1 { color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 1px; }
      .header p { color: rgba(255,255,255,0.8); margin: 5px 0 0 0; font-size: 14px; }
      .content { padding: 40px 30px; }
      .content h2 { color: #ffffff; font-size: 22px; margin-top: 0; }
      .content p { line-height: 1.6; color: #cccccc; font-size: 15px; }
      .footer { background-color: #111111; padding: 20px; text-align: center; border-top: 1px solid #333; }
      .footer p { margin: 0; color: #777777; font-size: 12px; }
      .logo { max-width: 50px; margin-bottom: 10px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <!-- Placeholder for Campus Companion Logo -->
        <svg class="logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
          <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h1>Campus Companion</h1>
        <p>Smart Student Productivity Hub</p>
      </div>
      <div class="content">
        <h2>${title}</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <div style="margin: 25px 0;">
          ${messageBody}
        </div>
        <p>Best Regards,<br/><strong>Campus Companion Admin Team</strong></p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Campus Companion. All rights reserved.</p>
        <p>This is an automated message, please do not reply to this email.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

module.exports = getEmailTemplate;
