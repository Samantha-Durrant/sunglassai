import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', logger(console.log))
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

// Auth middleware
async function requireAuth(request: Request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (!user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }
  return user;
}

// Sign up route
app.post('/make-server-97f474e9/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json()
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    })
    
    if (error) {
      console.log('Signup error:', error)
      return c.json({ error: error.message }, 400)
    }
    
    return c.json({ success: true, user: data.user })
  } catch (error) {
    console.log('Signup error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Get all brands
app.get('/make-server-97f474e9/brands', async (c) => {
  try {
    const user = await requireAuth(c.req.raw);
    if (user instanceof Response) return user;
    
    const brands = await kv.getByPrefix('brand:');
    return c.json(brands.map(item => ({ id: item.key.split(':')[1], ...item.value })));
  } catch (error) {
    console.log('Get brands error:', error);
    return c.json({ error: 'Failed to fetch brands' }, 500);
  }
});

// Add or update brand
app.post('/make-server-97f474e9/brands', async (c) => {
  try {
    const user = await requireAuth(c.req.raw);
    if (user instanceof Response) return user;
    
    const brandData = await c.req.json();
    const brandId = brandData.id || crypto.randomUUID();
    
    await kv.set(`brand:${brandId}`, {
      ...brandData,
      id: brandId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return c.json({ success: true, id: brandId });
  } catch (error) {
    console.log('Add brand error:', error);
    return c.json({ error: 'Failed to add brand' }, 500);
  }
});

// Delete brand
app.delete('/make-server-97f474e9/brands/:id', async (c) => {
  try {
    const user = await requireAuth(c.req.raw);
    if (user instanceof Response) return user;
    
    const brandId = c.req.param('id');
    await kv.del(`brand:${brandId}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Delete brand error:', error);
    return c.json({ error: 'Failed to delete brand' }, 500);
  }
});

// Generate AI email
app.post('/make-server-97f474e9/generate-email', async (c) => {
  try {
    const user = await requireAuth(c.req.raw);
    if (user instanceof Response) return user;
    
    const { brandName, ceoName, brandInfo, tone = 'professional' } = await c.req.json();
    
    // AI-powered email template generation
    const templates = {
      professional: `Subject: Partnership Opportunity with ${brandName}

Dear ${ceoName || 'Team'},

I hope this email finds you well. I'm reaching out to explore potential partnership opportunities between our organizations and ${brandName}.

Given ${brandName}'s strong presence in the sunglasses market and commitment to quality, I believe there could be significant mutual benefits in collaborating.

I would love to schedule a brief call to discuss how we might work together to create value for both our brands.

Best regards,
[Your Name]`,
      
      casual: `Subject: Exciting Partnership Idea for ${brandName}

Hi ${ceoName || 'there'}!

Hope you're having a great day! I came across ${brandName} and was really impressed by what you're doing in the sunglasses space.

I'd love to chat about some partnership ideas that could be a win-win for both of us. 

Would you be interested in a quick call this week?

Cheers,
[Your Name]`,
      
      creative: `Subject: ${brandName} x [Your Brand] - A Vision Worth Exploring

Hello ${ceoName || 'Creative Team'},

In a world where style meets substance, ${brandName} has carved out something special in the sunglasses industry.

I'm writing to propose a creative collaboration that could amplify both our brands' reach and impact. 

The future of eyewear partnerships is bright - let's talk about how we can make it even brighter together.

Looking forward to your thoughts,
[Your Name]`
    };
    
    const emailContent = templates[tone as keyof typeof templates] || templates.professional;
    
    return c.json({ emailContent });
  } catch (error) {
    console.log('Generate email error:', error);
    return c.json({ error: 'Failed to generate email' }, 500);
  }
});

// Send email via SendGrid
app.post('/make-server-97f474e9/send-email', async (c) => {
  try {
    const user = await requireAuth(c.req.raw);
    if (user instanceof Response) return user;
    
    const { to, subject, content, brandId } = await c.req.json();
    
    const sendgridApiKey = Deno.env.get('SENDGRID_API_KEY');
    if (!sendgridApiKey) {
      return c.json({ error: 'SendGrid API key not configured' }, 500);
    }
    
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendgridApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: to }],
          subject: subject,
        }],
        from: {
          email: 'noreply@yourcompany.com', // Replace with your verified sender
          name: 'Your Company Name'
        },
        content: [{
          type: 'text/plain',
          value: content
        }]
      })
    });
    
    const campaignId = crypto.randomUUID();
    
    // Track email in analytics
    await kv.set(`email:${campaignId}`, {
      to,
      subject,
      content,
      brandId,
      status: response.ok ? 'sent' : 'failed',
      sentAt: new Date().toISOString(),
      userId: user.id
    });
    
    // Update analytics counters
    const today = new Date().toISOString().split('T')[0];
    const emailsSentKey = `analytics:emails_sent:${today}`;
    const currentCount = await kv.get(emailsSentKey) || 0;
    await kv.set(emailsSentKey, currentCount + 1);
    
    if (response.ok) {
      return c.json({ success: true, campaignId });
    } else {
      const error = await response.text();
      console.log('SendGrid error:', error);
      return c.json({ error: 'Failed to send email' }, 500);
    }
  } catch (error) {
    console.log('Send email error:', error);
    return c.json({ error: 'Failed to send email' }, 500);
  }
});

// Get analytics
app.get('/make-server-97f474e9/analytics', async (c) => {
  try {
    const user = await requireAuth(c.req.raw);
    if (user instanceof Response) return user;
    
    const emails = await kv.getByPrefix('email:');
    const userEmails = emails.filter(email => email.value.userId === user.id);
    
    const analytics = {
      totalEmails: userEmails.length,
      sentEmails: userEmails.filter(email => email.value.status === 'sent').length,
      failedEmails: userEmails.filter(email => email.value.status === 'failed').length,
      recentEmails: userEmails
        .sort((a, b) => new Date(b.value.sentAt).getTime() - new Date(a.value.sentAt).getTime())
        .slice(0, 10)
        .map(email => ({
          id: email.key.split(':')[1],
          to: email.value.to,
          subject: email.value.subject,
          status: email.value.status,
          sentAt: email.value.sentAt
        }))
    };
    
    return c.json(analytics);
  } catch (error) {
    console.log('Analytics error:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

// Get campaign details
app.get('/make-server-97f474e9/campaigns/:id', async (c) => {
  try {
    const user = await requireAuth(c.req.raw);
    if (user instanceof Response) return user;
    
    const campaignId = c.req.param('id');
    const campaign = await kv.get(`email:${campaignId}`);
    
    if (!campaign || campaign.userId !== user.id) {
      return c.json({ error: 'Campaign not found' }, 404);
    }
    
    return c.json(campaign);
  } catch (error) {
    console.log('Get campaign error:', error);
    return c.json({ error: 'Failed to fetch campaign' }, 500);
  }
});

Deno.serve(app.fetch)