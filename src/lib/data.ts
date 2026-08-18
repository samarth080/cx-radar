import type { Conversation, Insight, Issue, Metric } from './types'

export const metrics: Metric[] = [
  { label: 'Total conversations', value: '1,284', change: '12.4%', direction: 'up', positive: true, description: 'All customer conversations received in the selected period.' },
  { label: 'Resolution rate', value: '78.6%', change: '4.2%', direction: 'up', positive: true, description: 'Share of conversations resolved without reopening.' },
  { label: 'Avg. resolution time', value: '6m 24s', change: '18%', direction: 'down', positive: true, description: 'Median time from first customer message to resolution.' },
  { label: 'Escalation rate', value: '8.3%', change: '1.1%', direction: 'up', positive: false, description: 'Conversations transferred to a specialist or manager.' },
]

export const issues: Issue[] = [
  {
    id: 'payment-failures', name: 'Payment failures', conversations: 74, change: 62, severity: 'Critical', sentiment: -0.82, resolutionRate: 61,
    trend: [21, 25, 22, 28, 35, 49, 74],
    summary: 'UPI payment failures are concentrated after bank authentication between 8 PM and 11 PM. Customers return to Nova with an error even though their bank confirms authentication.',
    patterns: [{ label: 'UPI transactions', value: '68%' }, { label: 'Android users', value: '54%' }, { label: 'Failures 8–11 PM', value: '71%' }, { label: 'Repeat contacts', value: '42%' }],
    actions: [
      { id: 'a1', title: 'Trace UPI callback failures with the payment gateway', owner: 'Engineering', effort: 'Medium', impact: 'Addresses the primary failure path' },
      { id: 'a2', title: 'Add a retry path that preserves the customer cart', owner: 'Product', effort: 'Medium', impact: 'Prevents abandoned orders' },
      { id: 'a3', title: 'Trigger a proactive payment-status notification', owner: 'Operations', effort: 'Low', impact: 'Reduces “did you charge me?” contacts' },
      { id: 'a4', title: 'Surface the transaction reference in the agent view', owner: 'Support', effort: 'Low', impact: 'Shortens resolution time' },
    ],
  },
  {
    id: 'refund-delays', name: 'Refund delays', conversations: 51, change: 31, severity: 'High', sentiment: -0.64, resolutionRate: 74,
    trend: [27, 29, 31, 35, 39, 46, 51],
    summary: 'Most refund contacts are expectation gaps, not failed refunds. Cancellation confirmations omit the expected credit date and payment-specific processing time.',
    patterns: [{ label: 'Within stated SLA', value: '76%' }, { label: 'ETA not shown', value: '83%' }, { label: 'UPI refunds', value: '47%' }, { label: 'Repeat contacts', value: '28%' }],
    actions: [{ id: 'b1', title: 'Show a payment-specific refund ETA at cancellation', owner: 'Product', effort: 'Low', impact: 'Prevents avoidable status contacts' }],
  },
  {
    id: 'delivery-tracking', name: 'Delivery tracking', conversations: 43, change: 18, severity: 'Medium', sentiment: -0.41, resolutionRate: 82,
    trend: [30, 28, 31, 34, 38, 41, 43],
    summary: 'Customers with delayed same-day deliveries cannot tell whether the order is still expected today because tracking stops at “out for delivery.”',
    patterns: [{ label: 'Same-day delivery', value: '61%' }, { label: 'No updated ETA', value: '72%' }, { label: 'Metro cities', value: '66%' }, { label: 'Repeat contacts', value: '19%' }],
    actions: [{ id: 'c1', title: 'Replace stale tracking states with a revised ETA', owner: 'Operations', effort: 'Medium', impact: 'Reduces WISMO contacts' }],
  },
  {
    id: 'login-otp', name: 'Login OTP not received', conversations: 28, change: -9, severity: 'Medium', sentiment: -0.38, resolutionRate: 86,
    trend: [35, 34, 31, 33, 30, 29, 28],
    summary: 'OTP delays are declining after the SMS provider change, but remain elevated for ported numbers on two carriers.',
    patterns: [{ label: 'Ported numbers', value: '49%' }, { label: 'Resolved on retry', value: '64%' }, { label: 'Android users', value: '58%' }, { label: 'Repeat contacts', value: '11%' }],
    actions: [{ id: 'd1', title: 'Offer WhatsApp OTP after 30 seconds', owner: 'Product', effort: 'Medium', impact: 'Creates a reliable fallback' }],
  },
]

const names = ['Priya Sharma', 'Rahul Mehta', 'Ananya Singh', 'Arjun Nair', 'Kavya Iyer', 'Rohan Gupta', 'Meera Joshi', 'Vikram Patel', 'Sneha Reddy', 'Aditya Verma', 'Ishita Shah', 'Neel Kapoor', 'Tanvi Rao', 'Siddharth Jain', 'Aarav Kulkarni', 'Diya Menon']
const locations = ['Bengaluru', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Chennai', 'Jaipur', 'Kochi']
const channels = ['WhatsApp', 'Live Chat', 'Email', 'Support Ticket'] as const
const scenarios = [
  { issue: 'Payment failure', category: 'Payments', intent: 'Complete payment', preview: 'The bank authentication was successful but Nova says my payment failed.', rootCause: 'UPI callback failed after successful bank authentication', customer: 'I approved the UPI payment in my bank app, but when I came back the order showed payment failed. Was I charged?', agent: 'I can see the payment is still being verified. Let me check the gateway reference for you.' },
  { issue: 'Refund delay', category: 'Refunds', intent: 'Check refund status', preview: "I cancelled three days ago and still haven't received the refund.", rootCause: 'Refund timeline was not communicated during cancellation', customer: "I cancelled my order three days ago and still haven't received my refund. I need the money urgently.", agent: 'Your refund was initiated on 14 August and should reach your account by 20 August.' },
  { issue: 'Delivery tracking', category: 'Delivery', intent: 'Find revised delivery time', preview: 'Tracking still says out for delivery. Is it actually coming today?', rootCause: 'Delayed delivery state does not include a revised ETA', customer: 'It has shown out for delivery since 10 AM. Is it still coming today or should I make other plans?', agent: 'The courier is delayed due to route volume. I am checking the revised delivery window.' },
  { issue: 'Login OTP', category: 'Account/Login', intent: 'Receive login OTP', preview: 'I requested the OTP four times and none of them arrived.', rootCause: 'SMS delivery delay for ported mobile numbers', customer: 'I have requested the OTP four times. Nothing has arrived and I cannot access my orders.', agent: 'I can help verify the number and send the code through our alternate route.' },
  { issue: 'Promo not applied', category: 'Promotions', intent: 'Apply promotion', preview: 'The offer banner says 20% off, but the code is invalid at checkout.', rootCause: 'Promotion eligibility exclusions are hidden until checkout', customer: 'The app shows 20% off, but the code says not valid when I try to pay. Why show it to me?', agent: 'I will verify the items and your account eligibility for this offer.' },
  { issue: 'Cancellation blocked', category: 'Order cancellation', intent: 'Cancel order', preview: 'The cancellation button disappeared even though the order has not shipped.', rootCause: 'Warehouse allocation locks self-service cancellation too early', customer: 'My order has not shipped but I cannot cancel it anymore. Please stop it before dispatch.', agent: 'The warehouse has started processing it. I am requesting a manual cancellation now.' },
  { issue: 'Damaged product', category: 'Product quality', intent: 'Replace product', preview: 'The mixer jar arrived cracked and the box was wet.', rootCause: 'Insufficient protective packaging for fragile kitchen appliances', customer: 'The mixer jar is cracked and the outer box was wet when it arrived. I need a replacement.', agent: 'I am sorry about the condition. Please share two photos and I will arrange priority replacement.' },
  { issue: 'Subscription renewal', category: 'Subscription', intent: 'Understand renewal charge', preview: 'I was charged for Plus today without a reminder.', rootCause: 'Renewal reminder was not delivered before auto-debit', customer: 'My Nova Plus plan renewed today. I did not get any reminder before the charge.', agent: 'I can check the reminder delivery and help with your renewal options.' },
]

export const conversations: Conversation[] = Array.from({ length: 108 }, (_, index) => {
  const scenario = scenarios[index % scenarios.length]
  const highRisk = index % 5 === 0 || scenario.category === 'Payments'
  const status = (index % 7 === 0 ? 'Escalated' : index % 3 === 0 ? 'Open' : index % 4 === 0 ? 'Pending' : 'Resolved') as Conversation['status']
  const sentiment = (scenario.category === 'Payments' || scenario.category === 'Refunds' ? (index % 2 ? 'Frustrated' : 'Negative') : index % 5 === 0 ? 'Negative' : index % 4 === 0 ? 'Neutral' : 'Frustrated') as Conversation['sentiment']
  const hour = 9 + (index * 7) % 13
  const minute = (index * 11) % 60
  return {
    id: `CV-${2841 + index}`,
    customer: { id: `CU-${8400 + index}`, name: names[index % names.length], location: locations[index % locations.length], plan: index % 4 === 0 ? 'Plus' : index % 5 === 0 ? 'Guest' : 'Standard' },
    channel: channels[index % channels.length], issue: scenario.issue, category: scenario.category,
    sentiment, sentimentScore: sentiment === 'Neutral' ? -0.05 : sentiment === 'Negative' ? -0.71 : -0.58,
    urgency: highRisk ? 'High' : index % 3 === 0 ? 'Medium' : 'Low', status,
    timestamp: `Aug ${18 - (index % 7)}, ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
    preview: scenario.preview, intent: scenario.intent, rootCause: scenario.rootCause,
    confidence: 88 + (index % 10), risk: highRisk ? 'Repeat contact likely' : status === 'Resolved' ? 'Low' : 'SLA breach possible',
    messages: [
      { sender: 'customer', body: scenario.customer, time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}` },
      { sender: 'agent', body: scenario.agent, time: `${hour.toString().padStart(2, '0')}:${((minute + 3) % 60).toString().padStart(2, '0')}` },
      { sender: 'customer', body: scenario.category === 'Refunds' ? "Why wasn't this timeline mentioned when I cancelled?" : 'Please resolve this today. I have already tried the suggested steps.', time: `${hour.toString().padStart(2, '0')}:${((minute + 7) % 60).toString().padStart(2, '0')}` },
    ],
  }
})

export const insights: Insight[] = [
  { id: 'i1', title: 'Payment complaints increased 62%', summary: 'UPI callbacks are failing after successful bank authentication, mostly between 8 PM and 11 PM.', severity: 'Critical', citations: ['CV-2841', 'CV-2849', 'CV-2865'] },
  { id: 'i2', title: 'Refund complaints increased 31%', summary: '76% of these refunds are within SLA. Customers are contacting support because cancellation screens omit a credit date.', severity: 'High', citations: ['CV-2842', 'CV-2850', 'CV-2866'] },
  { id: 'i3', title: '23% of contacts were preventable', summary: 'Clearer proactive messages for payment verification, refund ETA, and delayed delivery would remove an estimated 295 contacts this month.', severity: 'Medium', citations: ['CV-2843', 'CV-2851', 'CV-2859'] },
]

export const trendData = [
  { day: '12 Aug', Payments: 62, Refunds: 43, Delivery: 35, Account: 25 },
  { day: '13 Aug', Payments: 66, Refunds: 45, Delivery: 31, Account: 27 },
  { day: '14 Aug', Payments: 71, Refunds: 44, Delivery: 38, Account: 23 },
  { day: '15 Aug', Payments: 69, Refunds: 49, Delivery: 41, Account: 29 },
  { day: '16 Aug', Payments: 83, Refunds: 52, Delivery: 39, Account: 24 },
  { day: '17 Aug', Payments: 97, Refunds: 57, Delivery: 46, Account: 27 },
  { day: '18 Aug', Payments: 118, Refunds: 61, Delivery: 49, Account: 26 },
]
