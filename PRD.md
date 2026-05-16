# Planning Guide

A comprehensive safari tours and transfers website that showcases adventure packages in Kenya and provides an admin portal for tour package management.

**Experience Qualities**:
1. **Adventurous** - Evoke the excitement and wonder of African safari experiences through vibrant imagery and compelling descriptions
2. **Professional** - Instill confidence through polished design, clear information hierarchy, and trustworthy presentation
3. **Accessible** - Make booking safari tours feel approachable and straightforward for travelers of all experience levels

**Complexity Level**: Light Application (multiple features with basic state)
This app requires multiple views (public website, admin dashboard), authentication, and CRUD operations for tour packages, but maintains a focused feature set without complex workflows.

## Essential Features

**Tour Package Display**
- Functionality: Showcases available safari tours with photos, descriptions, durations, and pricing
- Purpose: Attracts potential customers and provides comprehensive tour information
- Trigger: User visits homepage or navigates to tours section
- Progression: Homepage hero → Tour packages grid → Individual package cards with details
- Success criteria: All tours display correctly with images, descriptions, and pricing; responsive layout works on all devices

**Contact/Inquiry Form**
- Functionality: Allows visitors to submit booking inquiries or questions
- Purpose: Generates leads and facilitates customer communication
- Trigger: User clicks contact button or navigates to contact section
- Progression: Click contact → Form appears → Fill details → Submit → Confirmation toast
- Success criteria: Form validates input, provides feedback on submission, clears after success

**Admin Authentication**
- Functionality: Secure login system for admin access
- Purpose: Protects tour management functionality from unauthorized access
- Trigger: User clicks admin login link on homepage
- Progression: Click admin link → Login form → Enter credentials → Verify → Access dashboard
- Success criteria: Only authorized users can access admin panel; session persists; clear error messages for invalid credentials

**Tour Package Management (Admin)**
- Functionality: Create, edit, and delete tour packages
- Purpose: Enables site owner to maintain current tour offerings
- Trigger: Admin logs in and accesses dashboard
- Progression: Login → Dashboard → View packages list → Add/Edit → Fill form → Save → Update display
- Success criteria: All CRUD operations work correctly; changes immediately reflect on public site; form validation prevents invalid data

**About/Services Section**
- Functionality: Describes company background, mission, and service offerings
- Purpose: Builds trust and credibility with potential customers
- Trigger: User scrolls homepage or clicks about navigation
- Progression: Navigate to section → Read company information → View service highlights
- Success criteria: Content is readable, well-organized, and professionally presented

**Vehicle Fleet Section**
- Functionality: Showcases available vehicles for safaris and transfers with specifications
- Purpose: Demonstrates fleet quality and helps customers choose appropriate transport
- Trigger: User scrolls to vehicles section or navigates via menu
- Progression: Navigate to section → View vehicle cards → See capacity, features, and images
- Success criteria: All vehicles display with clear specifications, images, and booking options

**Testimonials & Reviews Section**
- Functionality: Displays customer testimonials with ratings, comments, and verification badges
- Purpose: Builds trust and credibility through authentic customer experiences
- Trigger: User scrolls to testimonials section or clicks Reviews in navigation
- Progression: Navigate to section → View testimonial cards with star ratings → Read customer feedback → See verified badges
- Success criteria: Testimonials display with 5-star ratings, customer names, locations, tour taken, dates, and verification status; average rating calculated dynamically

**Testimonials Management (Admin)**
- Functionality: Create, edit, and delete customer testimonials
- Purpose: Enables site owner to manage and moderate customer reviews
- Trigger: Admin accesses dashboard and switches to Testimonials tab
- Progression: Login → Dashboard → Testimonials tab → Add/Edit testimonials → Fill form (name, location, rating, comment, tour, date, verification) → Save → Update display
- Success criteria: All CRUD operations work correctly; verified badge toggles properly; changes immediately reflect on public site; form validation prevents invalid data

**Payment Transactions Viewer (Admin)**
- Functionality: View all payment transactions with details including status, amount, payment method, customer info, and transaction IDs
- Purpose: Enables admin to track and reconcile all payments
- Trigger: Admin accesses dashboard and switches to Payments tab
- Progression: Login → Dashboard → Payments tab → View list of transactions sorted by date → See payment status badges → Review customer and transaction details
- Success criteria: All payments display with complete information; status badges color-coded (green for completed, yellow for pending, red for failed); transactions sorted newest first; clear display of payment method icons; transaction IDs visible for reconciliation

**Direct Payment Processing**
- Functionality: Accept credit card and M-Pesa payments directly on the website using real payment gateway APIs (Stripe and Safaricom Daraja)
- Purpose: Enables customers to complete bookings and payments seamlessly without leaving the website
- Trigger: User clicks "Book Now" button on any tour card
- Progression: Click Book Now → Payment dialog opens → Choose payment method (Credit Card or M-Pesa) → Fill payment details → Submit payment → API processes payment → Confirmation message → Email receipt → Transaction saved
- Success criteria: Both payment methods work with real APIs; form validation prevents invalid payment details; secure SSL encryption indicated; success confirmation displayed; payment information logged for admin review; error handling for failed payments with user-friendly messages; transaction records stored persistently

## Edge Case Handling

- **Empty Tours List**: Display welcoming message encouraging admin to add first tour package
- **Empty Testimonials List**: Section hidden when no testimonials exist; admin sees prompt to add first review
- **Invalid Login**: Show clear error message without revealing whether username or password was incorrect
- **Form Validation**: Prevent submission with incomplete fields; highlight errors inline
- **Rating Validation**: Ensure testimonial ratings are between 1-5 stars
- **Long Tour Descriptions**: Truncate or use expand/collapse for lengthy content on cards
- **Long Testimonial Comments**: Truncate with line-clamp on cards, full text visible in admin panel
- **Missing Images**: Display placeholder graphics when tour images aren't provided
- **Missing Avatars**: Generate initials-based avatar fallback for testimonials without photos
- **Simultaneous Edits**: Last save wins (acceptable for single-admin scenario)
- **Network Errors**: Display toast notifications when operations fail
- **Payment Processing Failures**: Show clear error messages; allow user to retry payment
- **Invalid Card Details**: Validate card number format, expiry date, and CVV before submission
- **Invalid M-Pesa Number**: Validate Kenyan phone number format (254XXXXXXXXX)
- **Payment Timeout**: Show timeout message if M-Pesa prompt not completed within reasonable time
- **Double Payment Prevention**: Disable payment buttons during processing to prevent duplicate charges

## Design Direction

The design should evoke the natural beauty, warmth, and adventure of African safaris - capturing golden savanna sunsets, earthy terrain, and vibrant wildlife. Professional yet inviting, the aesthetic should balance modern web design with organic, nature-inspired elements that make visitors feel the call of adventure.

## Color Selection

A sophisticated blue palette inspired by the vast African skies and pristine waters, balanced with earthy accents to maintain the safari connection.

- **Primary Color**: Deep ocean blue (oklch(0.45 0.12 250)) - Represents trust, professionalism, and the endless African skies, used for CTAs and key interactive elements
- **Secondary Colors**: Warm sand/tan (oklch(0.88 0.03 75)) for backgrounds; slate blue (oklch(0.38 0.08 260)) for secondary actions
- **Accent Color**: Bright sky blue (oklch(0.65 0.15 240)) for attention-grabbing CTAs, hover states, and important highlights
- **Foreground/Background Pairings**: 
  - Primary (Deep Ocean Blue oklch(0.45 0.12 250)): White text (oklch(1 0 0)) - Ratio 8.2:1 ✓
  - Accent (Sky Blue oklch(0.65 0.15 240)): White text (oklch(1 0 0)) - Ratio 5.5:1 ✓
  - Background (Light Cream oklch(0.97 0.01 75)): Dark Gray text (oklch(0.25 0.01 260)) - Ratio 13.1:1 ✓
  - Secondary (Slate Blue oklch(0.38 0.08 260)): White text (oklch(1 0 0)) - Ratio 9.8:1 ✓

## Font Selection

Typography should feel modern and clean while maintaining warmth and approachability, combining a distinctive display font with excellent readability for body content.

- **Typographic Hierarchy**: 
  - H1 (Hero/Main Title): Playfair Display Bold/48px/tight leading - Elegant and impactful for hero sections
  - H2 (Section Headers): Playfair Display SemiBold/36px/normal leading - Clear section delineation
  - H3 (Package Titles): Montserrat SemiBold/24px/normal leading - Strong, readable package names
  - Body Text: Montserrat Regular/16px/relaxed leading - Clean, modern readability
  - Small/Caption: Montserrat Regular/14px/normal leading - Supporting information

## Animations

Animations should enhance the sense of discovery and adventure while maintaining professional polish - subtle parallax effects on the hero, smooth hover states on tour cards that lift slightly, gentle fade-ins as content scrolls into view, and satisfying micro-interactions on buttons that feel responsive without delay.

## Component Selection

- **Components**:
  - `Card` - Tour package displays with shadow and hover effects
  - `Button` - CTAs throughout site, varying sizes for hierarchy
  - `Input`, `Textarea` - Contact form, admin package management, and payment forms
  - `Dialog` - Admin login modal, package edit forms, and payment processing
  - `Form` (react-hook-form) - Validation for contact, admin, and payment forms
  - `Tabs` - Organize admin dashboard sections (Tours, Testimonials) and payment methods (Card, M-Pesa)
  - `Alert` - Display important notices to admins
  - `Separator` - Visual breaks between sections and in payment dialog
  - `ScrollArea` - Tour description overflow handling
  - `Badge` - Tour duration, difficulty, or featured tags; verified customer badges
  - `Toast` (sonner) - Feedback for form submissions, admin actions, and payment confirmations
  - `Avatar` - Customer profile images in testimonials with initials fallback
  - `Switch` - Toggle featured tours and verified testimonials
  
- **Customizations**:
  - Custom hero section with full-width background image and overlay
  - Tour card with image, gradient overlay for text readability
  - Testimonial card with star rating display, verification badge, and customer avatar
  - Sticky navigation bar that changes background on scroll
  - Custom footer with multi-column layout for links and contact info
  
- **States**:
  - Buttons: Subtle shadow on hover, slight scale on press, loading spinner during async operations
  - Cards: Lift effect on hover with increased shadow depth
  - Inputs: Border color change on focus, inline error states with red accent
  - Images: Subtle zoom on card hover
  
- **Icon Selection**:
  - `MapPin` - Location indicators
  - `Calendar` - Tour duration
  - `Users` - Group size information
  - `Star` - Featured/recommended tours, testimonial ratings
  - `Seal` - Verified testimonial badge
  - `Phone`, `Envelope` - Contact methods
  - `PencilSimple` - Edit tour packages and testimonials
  - `Trash` - Delete packages and testimonials
  - `Plus` - Add new package or testimonial
  - `SignOut` - Admin logout
  - `Lock` - Login/security
  - `CreditCard` - Credit card payment method
  - `DeviceMobile` - M-Pesa payment method
  - `CheckCircle` - Payment success confirmation
  
- **Spacing**:
  - Page padding: px-6 md:px-12 lg:px-24
  - Section spacing: py-16 md:py-24
  - Card padding: p-6
  - Element gaps: gap-4 for tight groupings, gap-8 for section spacing
  
- **Mobile**:
  - Navigation collapses to hamburger menu below 768px
  - Tour cards stack vertically on mobile, 2-column grid on tablet, 3-column on desktop
  - Testimonial cards stack vertically on mobile, 2-column grid on tablet, 3-column on desktop
  - Hero text sizes reduce proportionally on smaller screens
  - Admin dashboard table becomes scrollable cards on mobile
  - Admin tabs remain accessible with touch-friendly sizing
  - Form inputs stack vertically with full width on mobile
