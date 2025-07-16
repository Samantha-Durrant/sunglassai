import sgMail from '@sendgrid/mail';
import { Brand } from './brandDatabase';

// Initialize SendGrid with API key from environment variables
let isInitialized = false;

export const initializeSendGrid = (apiKey?: string) => {
  const key = apiKey || process.env.VITE_SENDGRID_API_KEY || process.env.SENDGRID_API_KEY;
  
  if (key) {
    sgMail.setApiKey(key);
    isInitialized = true;
    return true;
  }
  
  console.warn('SendGrid API key not found. Please set VITE_SENDGRID_API_KEY in your environment variables.');
  return false;
};

export interface EmailData {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendSingleEmail = async (emailData: EmailData): Promise<boolean> => {
  if (!isInitialized) {
    throw new Error('SendGrid not initialized. Please call initializeSendGrid() first.');
  }

  try {
    await sgMail.send(emailData);
    console.log(`Email sent successfully to ${emailData.to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendBulkEmails = async (
  brands: Brand[], 
  fromEmail: string = 'anya.sunglassretailer@gmail.com',
  batchSize: number = 10,
  delayBetweenBatches: number = 1000
): Promise<{ successful: number; failed: number; results: Array<{ brand: string; success: boolean; error?: string }> }> => {
  
  if (!isInitialized) {
    throw new Error('SendGrid not initialized. Please call initializeSendGrid() first.');
  }

  const results: Array<{ brand: string; success: boolean; error?: string }> = [];
  let successful = 0;
  let failed = 0;

  // Process emails in batches to avoid rate limiting
  for (let i = 0; i < brands.length; i += batchSize) {
    const batch = brands.slice(i, i + batchSize);
    
    // Process batch concurrently
    const batchPromises = batch.map(async (brand) => {
      const emailTemplate = getPersonalizedEmailTemplate(brand.name);
      const htmlTemplate = getPersonalizedEmailHTMLTemplate(brand.name);
      
      const emailData: EmailData = {
        to: brand.email,
        from: fromEmail,
        subject: 'Partnership Opportunity with SunglassAI',
        text: emailTemplate,
        html: htmlTemplate
      };

      try {
        await sgMail.send(emailData);
        results.push({ brand: brand.name, success: true });
        successful++;
        console.log(`✅ Email sent to ${brand.name} (${brand.email})`);
        return true;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        results.push({ brand: brand.name, success: false, error: errorMessage });
        failed++;
        console.error(`❌ Failed to send email to ${brand.name}:`, errorMessage);
        return false;
      }
    });

    // Wait for batch to complete
    await Promise.all(batchPromises);
    
    // Add delay between batches if not the last batch
    if (i + batchSize < brands.length) {
      console.log(`Batch ${Math.floor(i / batchSize) + 1} completed. Waiting ${delayBetweenBatches}ms before next batch...`);
      await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
    }
  }

  return { successful, failed, results };
};

const getPersonalizedEmailTemplate = (brandName: string): string => {
  return `Dear ${brandName} Team,

I hope this email finds you well. My name is Anya Ganger, and I'm reaching out from SunglassAI, an innovative platform that's revolutionizing the way consumers discover and connect with premium eyewear brands.

We've been impressed by ${brandName}'s commitment to quality and design excellence, and we believe there's a fantastic opportunity for collaboration between our platforms.

SunglassAI offers:
• AI-powered brand discovery for targeted consumer matching
• Advanced analytics and market insights
• Direct consumer engagement tools
• Brand partnership opportunities

We'd love to explore how we can work together to:
• Increase ${brandName}'s visibility among qualified prospects
• Provide valuable consumer insights and analytics
• Create collaborative marketing opportunities
• Drive qualified traffic to your brand

Would you be available for a brief 15-minute call next week to discuss this opportunity? I'm confident we can create a mutually beneficial partnership that drives real value for ${brandName}.

Looking forward to hearing from you.

Best regards,
Anya Ganger
anya.sunglassretailer@gmail.com`;
};

const getPersonalizedEmailHTMLTemplate = (brandName: string): string => {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Partnership Opportunity with SunglassAI</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
        .content { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .highlight { background: #e3f2fd; padding: 15px; border-left: 4px solid #2196f3; margin: 15px 0; }
        .benefits { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .signature { background: white; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
        .brand-name { color: #2196f3; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🕶️ SunglassAI</h1>
        <p>Partnership Opportunity</p>
    </div>
    
    <div class="content">
        <p>Dear <span class="brand-name">${brandName}</span> Team,</p>
        
        <p>I hope this email finds you well. My name is <strong>Anya Ganger</strong>, and I'm reaching out from SunglassAI, an innovative platform that's revolutionizing the way consumers discover and connect with premium eyewear brands.</p>
        
        <div class="highlight">
            <p>We've been impressed by <span class="brand-name">${brandName}</span>'s commitment to quality and design excellence, and we believe there's a fantastic opportunity for collaboration between our platforms.</p>
        </div>
        
        <div class="benefits">
            <h3>🚀 SunglassAI offers:</h3>
            <ul>
                <li>AI-powered brand discovery for targeted consumer matching</li>
                <li>Advanced analytics and market insights</li>
                <li>Direct consumer engagement tools</li>
                <li>Brand partnership opportunities</li>
            </ul>
        </div>
        
        <div class="benefits">
            <h3>🎯 We'd love to explore how we can work together to:</h3>
            <ul>
                <li>Increase <span class="brand-name">${brandName}</span>'s visibility among qualified prospects</li>
                <li>Provide valuable consumer insights and analytics</li>
                <li>Create collaborative marketing opportunities</li>
                <li>Drive qualified traffic to your brand</li>
            </ul>
        </div>
        
        <p>Would you be available for a brief <strong>15-minute call next week</strong> to discuss this opportunity? I'm confident we can create a mutually beneficial partnership that drives real value for <span class="brand-name">${brandName}</span>.</p>
        
        <p>Looking forward to hearing from you.</p>
    </div>
    
    <div class="signature">
        <p><strong>Best regards,</strong></p>
        <p><strong>Anya Ganger</strong><br>
        Partnership Development<br>
        SunglassAI<br>
        📧 <a href="mailto:anya.sunglassretailer@gmail.com">anya.sunglassretailer@gmail.com</a></p>
    </div>
</body>
</html>`;
};

export const validateSendGridSetup = async (): Promise<{ isValid: boolean; message: string }> => {
  if (!isInitialized) {
    return { isValid: false, message: 'SendGrid not initialized' };
  }

  try {
    // Test email to verify SendGrid setup
    const testEmail: EmailData = {
      to: 'anya.sunglassretailer@gmail.com',
      from: 'anya.sunglassretailer@gmail.com',
      subject: 'SunglassAI SendGrid Test',
      text: 'This is a test email to verify SendGrid integration is working correctly.'
    };

    await sgMail.send(testEmail);
    return { isValid: true, message: 'SendGrid setup is valid and working' };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { isValid: false, message: `SendGrid setup error: ${errorMessage}` };
  }
};
