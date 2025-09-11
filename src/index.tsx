import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API endpoint for form submission
app.post('/api/submit-inquiry', async (c) => {
  try {
    const data = await c.req.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'businessName', 'requirements']
    for (const field of requiredFields) {
      if (!data[field]) {
        return c.json({ success: false, error: `${field} is required` }, 400)
      }
    }
    
    // Here you would typically save to database or send email
    // For now, we'll just log and return success
    console.log('New inquiry received:', data)
    
    return c.json({ 
      success: true, 
      message: 'Thank you for your inquiry! We will contact you within 24 hours.' 
    })
  } catch (error) {
    return c.json({ 
      success: false, 
      error: 'Failed to process your request. Please try again.' 
    }, 500)
  }
})

// Main route - serve the landing page
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LaunchPad - Professional Website Building Service | N$3500 Package</title>
    <meta name="description" content="Get your professional website up and running in just one week! Complete package includes custom design, mobile optimization, domain, emails, and 3 months FREE hosting.">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Icons -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Custom Styles -->
    <link href="/static/styles.css" rel="stylesheet">
    
    <!-- AOS Animation Library -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
</head>
<body class="font-poppins">
    <!-- Page Loader -->
    <div id="loader" class="fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-500">
        <div class="text-center">
            <div class="loader-spinner"></div>
            <h2 class="text-2xl font-bold text-indigo-900 mt-4">LaunchPad</h2>
            <p class="text-gray-600 mt-2">Loading your future website...</p>
        </div>
    </div>
    
    <!-- Navigation Bar -->
    <nav id="navbar" class="fixed top-0 left-0 right-0 bg-white shadow-md z-40 transition-all duration-300">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center h-20">
                <!-- Logo -->
                <div class="flex items-center">
                    <a href="#" class="text-2xl font-bold text-indigo-900 flex items-center">
                        <i class="fas fa-rocket mr-2 text-pink-500"></i>
                        LaunchPad
                    </a>
                </div>
                
                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#home" class="nav-link text-gray-700 hover:text-indigo-900 transition-colors">Home</a>
                    <a href="#services" class="nav-link text-gray-700 hover:text-indigo-900 transition-colors">Services</a>
                    <a href="#pricing" class="nav-link text-gray-700 hover:text-indigo-900 transition-colors">Pricing</a>
                    <a href="#how-it-works" class="nav-link text-gray-700 hover:text-indigo-900 transition-colors">How It Works</a>
                    <a href="#contact" class="nav-link text-gray-700 hover:text-indigo-900 transition-colors">Contact</a>
                    <a href="#inquiry-form" class="btn-consultation bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        Get Free Consultation
                    </a>
                </div>
                
                <!-- Mobile Menu Button -->
                <button id="mobile-menu-btn" class="md:hidden text-gray-700 text-2xl">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
        
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
            <div class="px-4 py-4 space-y-3">
                <a href="#home" class="block text-gray-700 hover:text-indigo-900 py-2">Home</a>
                <a href="#services" class="block text-gray-700 hover:text-indigo-900 py-2">Services</a>
                <a href="#pricing" class="block text-gray-700 hover:text-indigo-900 py-2">Pricing</a>
                <a href="#how-it-works" class="block text-gray-700 hover:text-indigo-900 py-2">How It Works</a>
                <a href="#contact" class="block text-gray-700 hover:text-indigo-900 py-2">Contact</a>
                <a href="#inquiry-form" class="block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-center">
                    Get Free Consultation
                </a>
            </div>
        </div>
    </nav>
    
    <!-- Hero Section -->
    <section id="home" class="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <!-- Animated Background -->
        <div class="animated-background absolute inset-0">
            <div class="floating-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
                <div class="shape shape-4"></div>
                <div class="shape shape-5"></div>
                <div class="shape shape-6"></div>
            </div>
        </div>
        
        <!-- Hero Content -->
        <div class="container mx-auto px-4 relative z-10">
            <div class="text-center max-w-4xl mx-auto">
                <h1 class="hero-title text-5xl md:text-7xl font-bold text-white mb-6" data-aos="fade-up">
                    WEBSITE BUILDING SERVICE
                </h1>
                <p class="hero-subtitle text-xl md:text-2xl text-gray-200 mb-8" data-aos="fade-up" data-aos-delay="100">
                    Get a Full-Life-Cycle Professional Web Presence Online in Just 3-7 Days
                </p>
                <div class="hero-cta" data-aos="fade-up" data-aos-delay="200">
                    <a href="#inquiry-form" class="btn-get-started inline-block bg-gradient-to-r from-pink-500 to-orange-500 text-white px-10 py-5 rounded-full text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <i class="fas fa-rocket mr-3"></i>
                        Get Started Now
                    </a>
                </div>
                <div class="mt-12 flex justify-center space-x-8 text-white" data-aos="fade-up" data-aos-delay="300">
                    <div class="text-center">
                        <i class="fas fa-check-circle text-3xl mb-2 text-green-400"></i>
                        <p class="font-semibold">3-7 Day Delivery</p>
                    </div>
                    <div class="text-center">
                        <i class="fas fa-shield-alt text-3xl mb-2 text-green-400"></i>
                        <p class="font-semibold">N$3500 / $200 USD</p>
                    </div>
                    <div class="text-center">
                        <i class="fas fa-headset text-3xl mb-2 text-green-400"></i>
                        <p class="font-semibold">24/7 Support</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <i class="fas fa-chevron-down text-2xl"></i>
        </div>
    </section>
    
    <!-- Complete Package Section -->
    <section id="services" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4" data-aos="fade-up">
                    Complete Package Includes
                </h2>
                <p class="text-xl text-gray-600" data-aos="fade-up" data-aos-delay="100">
                    Everything you need for a professional online presence
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="feature-cards-grid">
                <!-- Feature Card 1 -->
                <div class="feature-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                    <div class="feature-icon bg-gradient-to-br from-purple-500 to-pink-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-paint-brush text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Custom Design</h3>
                    <p class="text-gray-600 text-center">High-quality, unique website design tailored for your business, portfolio, or information needs</p>
                </div>
                
                <!-- Feature Card 2 -->
                <div class="feature-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                    <div class="feature-icon bg-gradient-to-br from-blue-500 to-cyan-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-mobile-alt text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Mobile Optimized</h3>
                    <p class="text-gray-600 text-center">Responsive design that looks perfect on all devices - phones, tablets, and desktops</p>
                </div>
                
                <!-- Feature Card 3 -->
                <div class="feature-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
                    <div class="feature-icon bg-gradient-to-br from-green-500 to-teal-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-globe text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Custom Domain</h3>
                    <p class="text-gray-600 text-center">Your own professional domain name included (e.g., www.yourbusiness.com)</p>
                </div>
                
                <!-- Feature Card 4 -->
                <div class="feature-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300" data-aos="fade-up" data-aos-delay="400">
                    <div class="feature-icon bg-gradient-to-br from-orange-500 to-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-envelope text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">5 Business Emails</h3>
                    <p class="text-gray-600 text-center">Professional email addresses for your team (e.g., info@yourbusiness.com)</p>
                </div>
                
                <!-- Feature Card 5 -->
                <div class="feature-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300" data-aos="fade-up" data-aos-delay="500">
                    <div class="feature-icon bg-gradient-to-br from-indigo-500 to-purple-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-wpforms text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Contact Forms</h3>
                    <p class="text-gray-600 text-center">Working contact forms that send inquiries directly to your email</p>
                </div>
                
                <!-- Feature Card 6 -->
                <div class="feature-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300" data-aos="fade-up" data-aos-delay="600">
                    <div class="feature-icon bg-gradient-to-br from-yellow-500 to-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-search text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">SEO Optimized</h3>
                    <p class="text-gray-600 text-center">Built with SEO best practices to help your website rank in search engines</p>
                </div>
                
                <!-- Feature Card 7 -->
                <div class="feature-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300" data-aos="fade-up" data-aos-delay="700">
                    <div class="feature-icon bg-gradient-to-br from-pink-500 to-rose-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-headset text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">3 Months Support</h3>
                    <p class="text-gray-600 text-center">Full technical support included for 3 months during your free hosting period</p>
                </div>
                
                <!-- Feature Card 8 -->
                <div class="feature-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300" data-aos="fade-up" data-aos-delay="800">
                    <div class="feature-icon bg-gradient-to-br from-cyan-500 to-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-server text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">3 Months FREE Hosting</h3>
                    <p class="text-gray-600 text-center">Premium web hosting included free for 3 months (then N$200/month)</p>
                </div>
                
                <!-- Feature Card 9 -->
                <div class="feature-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300" data-aos="fade-up" data-aos-delay="900">
                    <div class="feature-icon bg-gradient-to-br from-teal-500 to-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-shield-alt text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">SSL Certificate</h3>
                    <p class="text-gray-600 text-center">Secure HTTPS connection for your website to build trust with visitors</p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Pricing Section -->
    <section id="pricing" class="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-4" data-aos="fade-up">
                        Simple, Transparent Pricing
                    </h2>
                    <p class="text-xl text-gray-200" data-aos="fade-up" data-aos-delay="100">
                        One price, everything included
                    </p>
                </div>
                
                <!-- Pricing Card -->
                <div class="pricing-card bg-white rounded-3xl shadow-2xl overflow-hidden relative" data-aos="zoom-in" data-aos-delay="200">
                    <!-- Special Offer Banner -->
                    <div class="special-offer-banner absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-bl-2xl">
                        <span class="text-sm font-bold">SPECIAL OFFER - Valid Until November 30th</span>
                    </div>
                    
                    <div class="p-12">
                        <div class="text-center mb-8">
                            <h3 class="text-3xl font-bold text-gray-900 mb-4">Complete Website Package</h3>
                            <div class="price-display">
                                <span class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">N$3,500</span>
                                <p class="text-2xl text-gray-700 mt-2 font-semibold">or $200 USD</p>
                                <p class="text-lg text-gray-600 mt-1">GUARANTEED PRICE</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-center mb-8">
                            <div class="bg-green-100 text-green-800 px-6 py-3 rounded-full flex items-center">
                                <i class="fas fa-clock mr-2"></i>
                                <span class="font-semibold">Up & Running Within 3-7 Days</span>
                            </div>
                        </div>
                        
                        <ul class="space-y-4 mb-8">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 text-xl mr-3 mt-1"></i>
                                <span class="text-gray-700">Custom Professional Website Design</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 text-xl mr-3 mt-1"></i>
                                <span class="text-gray-700">Mobile Responsive Design</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 text-xl mr-3 mt-1"></i>
                                <span class="text-gray-700">Custom Domain Registration</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 text-xl mr-3 mt-1"></i>
                                <span class="text-gray-700">5 Professional Email Addresses</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 text-xl mr-3 mt-1"></i>
                                <span class="text-gray-700">SEO Optimization</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 text-xl mr-3 mt-1"></i>
                                <span class="text-gray-700">3 Months Technical Support</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 text-xl mr-3 mt-1"></i>
                                <span class="text-gray-700">3 Months FREE Hosting (then N$200/month)</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 text-xl mr-3 mt-1"></i>
                                <span class="text-gray-700">SSL Security Certificate</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 text-xl mr-3 mt-1"></i>
                                <span class="text-gray-700">24/7 Technical Support</span>
                            </li>
                        </ul>
                        
                        <div class="text-center">
                            <a href="#inquiry-form" class="btn-cta-pricing inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                Get Started Now
                                <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- How It Works Section -->
    <section id="how-it-works" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4" data-aos="fade-up">
                    How It Works
                </h2>
                <p class="text-xl text-gray-600" data-aos="fade-up" data-aos-delay="100">
                    Your website journey in 3 simple steps
                </p>
            </div>
            
            <div class="max-w-5xl mx-auto">
                <div class="relative">
                    <!-- Connection Line -->
                    <div class="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transform -translate-y-1/2"></div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        <!-- Step 1 -->
                        <div class="step-card text-center" data-aos="fade-up" data-aos-delay="100">
                            <div class="step-number bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-purple-500 relative z-10">
                                <span class="text-3xl font-bold text-purple-500">1</span>
                            </div>
                            <div class="step-icon text-5xl text-purple-500 mb-4">
                                <i class="fas fa-comments"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-3">Submit Requirements</h3>
                            <p class="text-gray-600">Tell us your vision and business needs through our simple form</p>
                        </div>
                        
                        <!-- Step 2 -->
                        <div class="step-card text-center" data-aos="fade-up" data-aos-delay="200">
                            <div class="step-number bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-pink-500 relative z-10">
                                <span class="text-3xl font-bold text-pink-500">2</span>
                            </div>
                            <div class="step-icon text-5xl text-pink-500 mb-4">
                                <i class="fas fa-code"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-3">We Design & Develop</h3>
                            <p class="text-gray-600">Our expert team brings your vision to life with professional design</p>
                        </div>
                        
                        <!-- Step 3 -->
                        <div class="step-card text-center" data-aos="fade-up" data-aos-delay="300">
                            <div class="step-number bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-orange-500 relative z-10">
                                <span class="text-3xl font-bold text-orange-500">3</span>
                            </div>
                            <div class="step-icon text-5xl text-orange-500 mb-4">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-3">Launch!</h3>
                            <p class="text-gray-600">Your new website goes live and starts attracting customers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Inquiry Form Section -->
    <section id="inquiry-form" class="py-20 bg-gradient-to-br from-gray-900 to-indigo-900">
        <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-4" data-aos="fade-up">
                        Ready to Launch Your Website?
                    </h2>
                    <p class="text-xl text-gray-200" data-aos="fade-up" data-aos-delay="100">
                        Fill in your details and basic requirements below, and we'll get back to you with a free consultation
                    </p>
                </div>
                
                <!-- Form Card -->
                <div class="form-card bg-white rounded-3xl shadow-2xl p-8 md:p-12" data-aos="fade-up" data-aos-delay="200">
                    <form id="inquiryForm" class="space-y-6">
                        <!-- Name Field -->
                        <div class="form-group">
                            <label for="name" class="block text-gray-700 font-semibold mb-2">
                                <i class="fas fa-user mr-2 text-purple-500"></i>
                                Your Name *
                            </label>
                            <input type="text" id="name" name="name" required
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                                placeholder="John Doe">
                        </div>
                        
                        <!-- Email Field -->
                        <div class="form-group">
                            <label for="email" class="block text-gray-700 font-semibold mb-2">
                                <i class="fas fa-envelope mr-2 text-purple-500"></i>
                                Email Address *
                            </label>
                            <input type="email" id="email" name="email" required
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                                placeholder="john@example.com">
                        </div>
                        
                        <!-- Phone Field -->
                        <div class="form-group">
                            <label for="phone" class="block text-gray-700 font-semibold mb-2">
                                <i class="fas fa-phone mr-2 text-purple-500"></i>
                                Phone Number *
                            </label>
                            <input type="tel" id="phone" name="phone" required
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                                placeholder="+264 81 234 5678">
                        </div>
                        
                        <!-- Business Name Field -->
                        <div class="form-group">
                            <label for="businessName" class="block text-gray-700 font-semibold mb-2">
                                <i class="fas fa-building mr-2 text-purple-500"></i>
                                Business/Project Name *
                            </label>
                            <input type="text" id="businessName" name="businessName" required
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                                placeholder="My Amazing Business">
                        </div>
                        
                        <!-- Requirements Field -->
                        <div class="form-group">
                            <label for="requirements" class="block text-gray-700 font-semibold mb-2">
                                <i class="fas fa-clipboard-list mr-2 text-purple-500"></i>
                                What should your website do? *
                            </label>
                            <textarea id="requirements" name="requirements" rows="4" required
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                                placeholder="E.g., Showcase my portfolio, sell products online, provide company information, booking system, etc."></textarea>
                        </div>
                        
                        <!-- Reference Field (Optional) -->
                        <div class="form-group">
                            <label for="reference" class="block text-gray-700 font-semibold mb-2">
                                <i class="fas fa-link mr-2 text-purple-500"></i>
                                Reference Websites (Optional)
                            </label>
                            <input type="url" id="reference" name="reference"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                                placeholder="https://example.com (websites you like)">
                        </div>
                        
                        <!-- Submit Button -->
                        <div class="text-center pt-6">
                            <button type="submit" id="submitBtn"
                                class="btn-submit bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                                <span class="btn-text">Submit My Interest</span>
                                <span class="btn-loading hidden">
                                    <i class="fas fa-spinner fa-spin mr-2"></i>
                                    Processing...
                                </span>
                                <span class="btn-success hidden">
                                    <i class="fas fa-check mr-2"></i>
                                    Success!
                                </span>
                            </button>
                        </div>
                    </form>
                    
                    <!-- Success/Error Messages -->
                    <div id="formMessage" class="mt-6 hidden">
                        <div class="alert p-4 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Footer Section -->
    <footer id="contact" class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Company Info -->
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start mb-4">
                        <i class="fas fa-rocket text-3xl text-pink-500 mr-3"></i>
                        <h3 class="text-2xl font-bold">LaunchPad</h3>
                    </div>
                    <p class="text-gray-400">
                        Professional website building service delivering high-quality web solutions in just one week.
                    </p>
                </div>
                
                <!-- Contact Info -->
                <div class="text-center">
                    <h4 class="text-xl font-semibold mb-4">Contact Us</h4>
                    <div class="space-y-3">
                        <p class="text-gray-400">
                            <i class="fas fa-phone mr-2 text-pink-500"></i>
                            <a href="tel:+26481827935" class="hover:text-pink-500 transition-colors">+264 81 827 935</a>
                        </p>
                        <p class="text-gray-400">
                            <i class="fas fa-envelope mr-2 text-pink-500"></i>
                            <a href="mailto:development@dynamic-odyssey.com" class="hover:text-pink-500 transition-colors">development@dynamic-odyssey.com</a>
                        </p>
                    </div>
                </div>
                
                <!-- Social Links -->
                <div class="text-center md:text-right">
                    <h4 class="text-xl font-semibold mb-4">Follow Us</h4>
                    <div class="flex justify-center md:justify-end space-x-4">
                        <a href="#" class="social-link bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social-link bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="social-link bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="#" class="social-link bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                            <i class="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-8 pt-8 text-center">
                <p class="text-gray-400">
                    © 2025 LaunchPad. All rights reserved. | 
                    <span class="text-pink-500 font-semibold">Special Offer Valid Until November 30th</span>
                </p>
            </div>
        </div>
    </footer>
    
    <!-- Scripts -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="/static/app.js"></script>
</body>
</html>
  `)
})

export default app