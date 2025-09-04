export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export function getStatusColor(status) {
  switch(status) {
    case 'Delivered': return 'bg-green-500'
    case 'In Transit': return 'bg-yellow-500'
    case 'Shipped': return 'bg-blue-500'
    default: return 'bg-gray-500'
  }
}

export function downloadTrackingTicket(data) {
  const ticketContent = `
GLOBAL TRADE SOLUTIONS
TRACKING TICKET
========================

Tracking Code: ${data.trackingCode}
Status: ${data.status}
Carrier: ${data.carrier}
Ship Date: ${data.shipDate}
Estimated Delivery: ${data.estimatedDelivery}

Generated on: ${new Date().toLocaleString()}

Thank you for choosing Global Trade Solutions!
  `

  const blob = new Blob([ticketContent], { type: 'text/plain' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `tracking-ticket-${data.trackingCode}.txt`
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}