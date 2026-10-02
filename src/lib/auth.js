import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from 'resend';
  
const resend = new Resend(process.env.RESEND_API_KEY);
const client = new MongoClient(process.env.MONGO_DB_URL);
const db = client.db('better-auth');

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async (user, url) => {
      void resend.emails.send({
        from : 'Acme <onboarding@resend.dev>',
        to: user.email,
        subject: 'Reset your password',
        html: `Click <a href="${url}">here</a> to reset your password. <p>If you haven't requested a password reset, you can ignore this email.</p>`,
      })}},
  emailVerification: {
    sendVerificationEmail: async (user, url) => {void resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: user.email,
        subject: 'Verify your email address',
        html: `Click <a href="${url}">here</a> to verify your email address.`,
      })},
    sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 3600
    },
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        },
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET, 
        },
    },
  database: mongodbAdapter(db, {
    client
  }),
});




