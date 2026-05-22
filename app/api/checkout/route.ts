import { NextRequest, NextResponse } from 'next/server'
// These imports will work after merge with backend:
// import Stripe from 'stripe'
// import { createClient } from '@supabase/supabase-js'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: NextRequest) {
  // TODO: Activate after backend merge
  // 1. Read cart items from request body
  // 2. Verify prices server-side from Supabase (never trust client prices)
  // 3. Create Stripe PaymentIntent with amount in centimes, currency 'mad'
  // 4. Return { clientSecret }
  
  return NextResponse.json({ 
    clientSecret: 'placeholder_will_be_replaced_after_merge',
    message: 'API route structure ready. Connect Stripe keys to activate.'
  })
}
