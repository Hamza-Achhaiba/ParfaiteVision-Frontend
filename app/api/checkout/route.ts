import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // TODO: Connect after backend merge
  // 1. Verify prices from Supabase
  // 2. Create Stripe PaymentIntent (for card/google pay)
  // 3. Or create COD order (for paiement à la livraison)
  // 4. Return clientSecret or orderConfirmation
  return NextResponse.json({ 
    clientSecret: 'placeholder',
    message: 'Connect Stripe keys after merge'
  })
}
