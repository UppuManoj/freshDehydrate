import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaCheckCircle, 
  FaDownload,
  FaHome,
  FaShoppingCart,
  FaTruck,
  FaBox,
  FaClipboardCheck
} from 'react-icons/fa';
import './OrderSuccess.css';

const OrderSuccess = ({ clearCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData] = useState(location.state || {});
  const [currentTime] = useState(new Date());

  // Generate order ID and tracking information
  const [orderId] = useState(() => {
    // Generate a random 6-digit number (100000 to 999999)
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    return `FD${randomNumber}`;
  });
  const estimatedDelivery = new Date(currentTime.getTime() + (5 * 24 * 60 * 60 * 1000)); // 5 days from now

  // Tracking timeline
  const trackingSteps = [
    {
      status: 'Order Placed',
      description: 'Your order has been successfully placed',
      timestamp: currentTime,
      completed: true,
      icon: <FaClipboardCheck />
    },
    {
      status: 'Order Confirmed',
      description: 'Payment confirmed and order is being processed',
      timestamp: new Date(currentTime.getTime() + (30 * 60 * 1000)), // 30 minutes later
      completed: true,
      icon: <FaCheckCircle />
    },
    {
      status: 'Packed',
      description: 'Your items are being packed for shipment',
      timestamp: new Date(currentTime.getTime() + (24 * 60 * 60 * 1000)), // 1 day later
      completed: false,
      icon: <FaBox />
    },
    {
      status: 'Shipped',
      description: 'Your order is on its way',
      timestamp: new Date(currentTime.getTime() + (2 * 24 * 60 * 60 * 1000)), // 2 days later
      completed: false,
      icon: <FaTruck />
    },
    {
      status: 'Out for Delivery',
      description: 'Your order is out for delivery',
      timestamp: new Date(currentTime.getTime() + (4 * 24 * 60 * 60 * 1000)), // 4 days later
      completed: false,
      icon: <FaTruck />
    },
    {
      status: 'Delivered',
      description: 'Order delivered successfully',
      timestamp: estimatedDelivery,
      completed: false,
      icon: <FaCheckCircle />
    }
  ];

  useEffect(() => {
    // Clear the cart when component mounts
    if (clearCart) {
      clearCart();
    }

    // Redirect if no order data
    if (!orderData.items || orderData.items.length === 0) {
      navigate('/');
    }
  }, [clearCart, orderData, navigate]);

  const generateInvoice = () => {
    // Create PDF using jsPDF
    import('jspdf').then((jsPDFModule) => {
      const { jsPDF } = jsPDFModule;
      const doc = new jsPDF();
      
      // Set font
      doc.setFont('helvetica');
      
      // Header
      doc.setFontSize(20);
      doc.setTextColor(40, 180, 22); // Green color
      doc.text('FRESH DEHYDRATE', 20, 30);
      
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text('ORDER INVOICE', 20, 45);
      
      // Order details
      doc.setFontSize(12);
      doc.text(`Order ID: ${orderId}`, 20, 65);
      doc.text(`Order Date: ${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`, 20, 75);
      doc.text(`Payment Status: Paid`, 20, 85);
      
      // Billing Information
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text('BILLING INFORMATION', 20, 105);
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      let yPos = 115;
      doc.text(orderData.shippingAddress?.fullName || '', 20, yPos);
      yPos += 10;
      doc.text(orderData.shippingAddress?.addressLine1 || '', 20, yPos);
      yPos += 10;
      if (orderData.shippingAddress?.addressLine2) {
        doc.text(orderData.shippingAddress.addressLine2, 20, yPos);
        yPos += 10;
      }
      doc.text(`${orderData.shippingAddress?.cityName}, ${orderData.shippingAddress?.stateName} - ${orderData.shippingAddress?.pinCode}`, 20, yPos);
      yPos += 10;
      doc.text(`Phone: ${orderData.shippingAddress?.phoneNumber}`, 20, yPos);
      
      // Items table header
      yPos += 25;
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text('ITEMS ORDERED', 20, yPos);
      
      yPos += 15;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      
      // Table headers
      doc.text('Item Name', 20, yPos);
      doc.text('Qty', 120, yPos);
      doc.text('Price', 140, yPos);
      doc.text('Total', 170, yPos);
      
      // Draw line under headers
      yPos += 5;
      doc.line(20, yPos, 190, yPos);
      
      // Items
      yPos += 10;
      orderData.items?.forEach(item => {
        doc.text(item.name.length > 25 ? item.name.substring(0, 25) + '...' : item.name, 20, yPos);
        doc.text(item.quantity.toString(), 120, yPos);
        doc.text(`₹${item.price}`, 140, yPos);
        doc.text(`₹${(item.price * item.quantity).toFixed(2)}`, 170, yPos);
        yPos += 10;
      });
      
      // Summary
      yPos += 10;
      doc.line(20, yPos, 190, yPos);
      yPos += 15;
      
      doc.setFontSize(12);
      doc.text('ORDER SUMMARY', 20, yPos);
      
      yPos += 15;
      doc.setFontSize(11);
      doc.text(`Subtotal:`, 120, yPos);
      doc.text(`₹${orderData.subtotal?.toFixed(2)}`, 170, yPos);
      yPos += 10;
      
      doc.text(`Shipping:`, 120, yPos);
      doc.text(`₹${orderData.shipping?.toFixed(2)}`, 170, yPos);
      yPos += 10;
      
      doc.text(`Tax:`, 120, yPos);
      doc.text(`₹${orderData.tax?.toFixed(2)}`, 170, yPos);
      yPos += 10;
      
      // Total
      doc.setFontSize(12);
      doc.setTextColor(40, 180, 22);
      doc.text(`TOTAL AMOUNT:`, 120, yPos);
      doc.text(`₹${orderData.total?.toFixed(2)}`, 170, yPos);
      
      // Footer
      yPos += 25;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Thank you for shopping with Fresh Dehydrate!', 20, yPos);
      yPos += 10;
      doc.text('For any queries, contact us at support@freshdehydrate.com', 20, yPos);
      
      // Save the PDF
      doc.save(`FreshDehydrate_Invoice_${orderId}.pdf`);
    }).catch((error) => {
      console.error('Error loading jsPDF:', error);
      // Fallback to text file if PDF library fails
      const invoiceContent = `
FRESH DEHYDRATE - ORDER CONFIRMATION
=====================================

Order ID: ${orderId}
Order Date: ${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}

BILLING INFORMATION:
${orderData.shippingAddress?.fullName}
${orderData.shippingAddress?.addressLine1}
${orderData.shippingAddress?.addressLine2}
${orderData.shippingAddress?.cityName}, ${orderData.shippingAddress?.stateName} - ${orderData.shippingAddress?.pinCode}
Phone: ${orderData.shippingAddress?.phoneNumber}

ITEMS ORDERED:
${orderData.items?.map(item => 
  `${item.name} - Qty: ${item.quantity} - ₹${item.price} each - Total: ₹${(item.price * item.quantity).toFixed(2)}`
).join('\n')}

ORDER SUMMARY:
Subtotal: ₹${orderData.subtotal?.toFixed(2)}
Shipping: ₹${orderData.shipping?.toFixed(2)}
Tax: ₹${orderData.tax?.toFixed(2)}
Total Amount: ₹${orderData.total?.toFixed(2)}

Payment Method: ${orderData.paymentMethod || 'Card'}
Payment Status: Paid

Estimated Delivery: ${estimatedDelivery.toLocaleDateString()}

Thank you for shopping with Fresh Dehydrate!
For any queries, contact us at support@freshdehydrate.com
      `;

      const blob = new Blob([invoiceContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `FreshDehydrate_Order_${orderId}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  };

  const formatDateTime = (date) => {
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="order-success-page">
      <div className="order-success-container">
        {/* Success Header */}
        <div className="success-header">
          <div className="success-icon-container">
            <FaCheckCircle className="success-icon" />
          </div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
        </div>

        {/* Simple Order Details */}
        <div className="simple-order-card">
          <div className="order-id-section">
            <p className="order-id-label">Order ID - {orderId}</p>
          </div>

          {/* Main Product Display */}
          <div className="main-product-section">
            {orderData.items && orderData.items.length > 0 && (
              <div className="product-display">
                <img src={orderData.items[0].image} alt={orderData.items[0].name} className="product-image" />
                <div className="product-info">
                  <h3 className="product-name">{orderData.items[0].name}</h3>
                  <p className="product-details">Quantity: {orderData.items[0].quantity}</p>
                  <p className="seller-info">Seller: Fresh Dehydrate</p>
                </div>
              </div>
            )}
          </div>

          {/* Simple Tracking Timeline */}
          <div className="simple-tracking">
            {trackingSteps.map((step, index) => (
              <div key={index} className={`simple-tracking-step ${step.completed ? 'completed' : 'pending'}`}>
                <div className="step-indicator">
                  <div className={`step-circle ${step.completed ? 'filled' : 'empty'}`}></div>
                  {index < trackingSteps.length - 1 && <div className="step-line"></div>}
                </div>
                <div className="step-info">
                  <h4 className="step-title">{step.status}</h4>
                  <p className="step-date">
                    {step.completed ? 
                      formatDateTime(step.timestamp).split(' at ')[0] : 
                      `Expected by ${formatDateTime(step.timestamp).split(' at ')[0]}`
                    }
                  </p>
                  {step.status === 'Delivered' && !step.completed && (
                    <p className="delivery-note">Item yet to be delivered.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="order-actions">
          <button className="download-invoice-btn" onClick={generateInvoice}>
            <FaDownload /> Download Invoice
          </button>
          <button className="continue-shopping-btn" onClick={() => navigate('/products')}>
            <FaShoppingCart /> Continue Shopping
          </button>
          <button className="go-home-btn" onClick={() => navigate('/')}>
            <FaHome /> Go to Home
          </button>
        </div>

        {/* Help Section */}
        <div className="help-section">
          <h4>Need Help?</h4>
          <p>If you have any questions about your order, please contact our customer support.</p>
          <div className="help-actions">
            <button onClick={() => navigate('/contact')} className="contact-support-btn">
              Contact Support
            </button>
            <button onClick={() => navigate('/profile')} className="view-orders-btn">
              View All Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
