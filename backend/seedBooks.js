require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/Book");
const User = require("./models/User");
const { generateChapterContent } = require("./controller/aiController");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Sample book data with chapters
const sampleBooks = [
    {
        title: "The Art of Mindfulness",
        subtitle: "A Beginner's Guide to Living in the Present",
        author: "Sarah Johnson",
        status: "published",
        chapters: [
            {
                title: "Chapter 1: Understanding Mindfulness",
                description: `Mindfulness is the practice of being fully present and engaged in the current moment, aware of your thoughts and feelings without judgment. In our fast-paced world, we often find ourselves dwelling on the past or worrying about the future, missing the richness of the present moment.

The concept of mindfulness has its roots in ancient Buddhist meditation practices, but it has been adapted for modern secular use. Research has shown that regular mindfulness practice can reduce stress, improve focus, enhance emotional regulation, and even boost physical health.

At its core, mindfulness is about paying attention—to your breath, your body, your thoughts, and your surroundings. It's not about emptying your mind or achieving a special state, but rather about observing what is happening right now with curiosity and acceptance.

Many people think mindfulness requires hours of meditation, but even a few minutes a day can make a difference. The key is consistency and bringing mindful awareness to everyday activities like eating, walking, or even washing dishes.`
            },
            {
                title: "Chapter 2: The Science Behind Mindfulness",
                description: `Neuroscience research has revealed fascinating insights into how mindfulness affects the brain. Studies using brain imaging technology have shown that regular mindfulness practice can actually change the structure and function of the brain.

One of the most significant findings is that mindfulness meditation increases gray matter density in areas associated with learning, memory, and emotional regulation. The hippocampus, which plays a crucial role in memory formation, shows increased volume in regular meditators.

Additionally, mindfulness practice has been shown to reduce activity in the amygdala, the brain's "fear center" responsible for the fight-or-flight response. This explains why mindfulness practitioners often report feeling less reactive to stress and more emotionally balanced.

The prefrontal cortex, responsible for executive functions like decision-making and self-control, also shows enhanced activity in those who practice mindfulness regularly. This can lead to better impulse control and more thoughtful responses to challenging situations.

Research has also demonstrated that mindfulness can reduce inflammation markers in the body, lower blood pressure, and improve immune function. These physical benefits complement the mental and emotional advantages of the practice.`
            },
            {
                title: "Chapter 3: Getting Started with Mindfulness",
                description: `Beginning a mindfulness practice doesn't require special equipment or extensive training. You can start right now, wherever you are. Here are some simple steps to get you started:

1. **Find a Quiet Space**: Choose a place where you won't be disturbed for a few minutes. It doesn't have to be perfectly silent, but it should be relatively calm.

2. **Set a Timer**: Start with just 5 minutes. You can gradually increase the duration as you become more comfortable with the practice.

3. **Get Comfortable**: Sit in a chair or on a cushion with your back straight but not rigid. You can also lie down if sitting is uncomfortable, though you might be more prone to falling asleep.

4. **Focus on Your Breath**: Close your eyes and bring your attention to your breathing. Notice the sensation of air entering and leaving your nostrils, or the rise and fall of your chest or belly.

5. **Notice When Your Mind Wanders**: It's completely normal for your mind to wander. When you notice this happening, gently bring your attention back to your breath without judging yourself.

6. **Be Patient and Kind**: Don't expect perfection. Some days will feel easier than others, and that's okay. The practice is in the returning to the present moment, again and again.

Remember, mindfulness is a skill that develops over time. Be patient with yourself and celebrate small victories along the way.`
            },
            {
                title: "Chapter 4: Mindfulness in Daily Life",
                description: `While formal meditation is valuable, the true power of mindfulness comes from integrating it into your daily activities. Here are some ways to bring mindfulness into your everyday life:

**Mindful Eating**: Instead of rushing through meals, take time to notice the colors, smells, textures, and flavors of your food. Chew slowly and savor each bite. This not only enhances your enjoyment but can also improve digestion and help with weight management.

**Mindful Walking**: Whether you're walking to your car or taking a stroll in the park, pay attention to the sensation of your feet touching the ground, the movement of your body, and the sights and sounds around you.

**Mindful Listening**: When someone is speaking to you, give them your full attention. Notice the urge to interrupt or plan your response, and instead, simply listen with curiosity and openness.

**Mindful Working**: Before starting a task, take a moment to center yourself. As you work, notice when you're getting distracted and gently bring your focus back to what you're doing.

**Mindful Technology Use**: Set boundaries around your phone and computer use. Notice the impulse to check your devices and ask yourself if it's necessary in that moment.

By bringing mindfulness to these everyday activities, you transform ordinary moments into opportunities for presence and awareness. Over time, this can lead to a profound shift in how you experience life.`
            },
            {
                title: "Chapter 5: Overcoming Common Challenges",
                description: `As you develop your mindfulness practice, you'll likely encounter some common challenges. Here's how to work with them:

**"I can't stop thinking"**: This is the most common concern, but it's based on a misunderstanding. Mindfulness isn't about stopping thoughts—it's about changing your relationship with them. When thoughts arise, simply notice them and return to your breath.

**"I don't have time"**: Even 2-3 minutes of mindfulness can be beneficial. Consider it an investment in your well-being that will actually help you be more productive and focused throughout the day.

**"I fall asleep"**: If you're falling asleep during meditation, you might be sleep-deprived. Try meditating at a different time of day, or practice with your eyes open. You can also try walking meditation instead.

**"I feel more anxious"**: Sometimes when we slow down and pay attention, we become more aware of underlying anxiety. This is actually progress—you're becoming more aware. Continue the practice gently, and consider working with a teacher or therapist if the anxiety is overwhelming.

**"I'm not doing it right"**: There's no perfect way to practice mindfulness. If you're making the effort to pay attention and return to the present moment when you notice you've wandered, you're doing it right.

**"I don't feel any different"**: Changes from mindfulness practice can be subtle. Keep a journal to track your experiences, and remember that benefits accumulate over time. Trust the process.

Remember, challenges are a normal part of the practice. Each time you work through a difficulty, you're strengthening your mindfulness muscle.`
            }
        ]
    },
    {
        title: "Introduction to Web Development",
        subtitle: "Building Your First Website",
        author: "Alex Chen",
        status: "draft",
        chapters: [
            {
                title: "Chapter 1: What is Web Development?",
                description: `Web development is the process of creating websites and web applications that run on the internet. It's a dynamic field that combines creativity, problem-solving, and technical skills to build the digital experiences we use every day.

There are three main areas of web development:

**Front-end Development**: This is what users see and interact with. Front-end developers work with HTML (structure), CSS (styling), and JavaScript (interactivity) to create the visual and interactive elements of a website.

**Back-end Development**: This is the behind-the-scenes functionality. Back-end developers work with server-side languages like Python, Node.js, or PHP to handle data, user authentication, and business logic.

**Full-stack Development**: Full-stack developers work on both front-end and back-end, understanding how all the pieces fit together to create a complete web application.

The web development landscape is constantly evolving. New frameworks, tools, and best practices emerge regularly. However, the fundamental concepts remain the same: creating accessible, performant, and user-friendly web experiences.

Whether you want to build personal projects, freelance, or work for a tech company, web development offers exciting opportunities. The barrier to entry is relatively low—all you need is a computer and internet connection to get started.`
            },
            {
                title: "Chapter 2: HTML Basics",
                description: `HTML (HyperText Markup Language) is the foundation of every website. It provides the structure and content of web pages using a system of tags and elements.

**Basic Structure**: Every HTML document starts with a DOCTYPE declaration and contains a <html> element that wraps everything. Inside, you'll find a <head> section (for metadata) and a <body> section (for visible content).

**Common Elements**:
- Headings: <h1> through <h6> for different levels of headings
- Paragraphs: <p> for text content
- Links: <a> for hyperlinks
- Images: <img> for displaying images
- Lists: <ul> for unordered lists, <ol> for ordered lists
- Divs and Spans: <div> for block-level containers, <span> for inline containers

**Semantic HTML**: Modern HTML emphasizes using semantic elements that describe their meaning, like <header>, <nav>, <main>, <article>, <section>, and <footer>. This improves accessibility and SEO.

**Attributes**: HTML elements can have attributes that provide additional information. Common attributes include id, class, src, href, and alt.

**Best Practices**:
- Always close your tags
- Use lowercase for tag names
- Indent nested elements for readability
- Include alt text for images
- Use semantic HTML when possible

HTML is straightforward to learn, and you can start creating simple web pages within hours. The key is practice—build small projects and gradually increase complexity as you learn.`
            },
            {
                title: "Chapter 3: CSS Fundamentals",
                description: `CSS (Cascading Style Sheets) is what makes websites look good. While HTML provides structure, CSS controls the visual presentation—colors, fonts, layouts, and animations.

**Selectors**: CSS uses selectors to target HTML elements. You can select by element type (p), class (.classname), ID (#idname), or more complex patterns.

**Properties and Values**: CSS works by applying properties (like color, font-size, margin) with specific values to selected elements.

**The Box Model**: Every HTML element is essentially a box with content, padding, border, and margin. Understanding the box model is crucial for layout control.

**Layout Techniques**:
- **Flexbox**: Great for one-dimensional layouts (rows or columns)
- **Grid**: Perfect for two-dimensional layouts
- **Positioning**: Absolute, relative, fixed, and sticky positioning for precise control

**Responsive Design**: Modern websites must work on all screen sizes. Use media queries to apply different styles based on device width, and consider mobile-first design approaches.

**Colors and Typography**: Choose colors that work well together and ensure sufficient contrast for readability. Select fonts that match your design aesthetic and load quickly.

**Animations and Transitions**: CSS can create smooth animations and transitions without JavaScript, enhancing user experience when used thoughtfully.

**CSS Preprocessors**: Tools like Sass and Less extend CSS with variables, nesting, and functions, making large stylesheets more maintainable.

CSS has a gentle learning curve but infinite depth. Start with basics and gradually explore advanced techniques as you build more complex designs.`
            }
        ]
    }
];

async function seedBooks() {
    try {
        console.log("🌱 Starting book seeding...");

        // Find the first user (or create a test user)
        let user = await User.findOne();

        if (!user) {
            console.log("📝 No user found. Creating test user...");
            user = await User.create({
                name: "Test User",
                email: "test@example.com",
                password: "password123"
            });
            console.log("✅ Test user created");
        }

        // Clear existing books for this user
        await Book.deleteMany({ userID: user._id });
        console.log("🗑️  Cleared existing books");

        // Create sample books
        for (const bookData of sampleBooks) {
            const book = await Book.create({
                userID: user._id,
                title: bookData.title,
                subtitle: bookData.subtitle,
                author: bookData.author,
                status: bookData.status,
                chapters: bookData.chapters,
                coverImage: ""
            });
            console.log(`✅ Created book: "${book.title}" with ${book.chapters.length} chapters`);
        }

        console.log("\n🎉 Book seeding completed successfully!");
        console.log(`📚 Total books created: ${sampleBooks.length}`);
        console.log(`\n📧 Login with: test@example.com / password123`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding books:", error);
        process.exit(1);
    }
}

// Run the seed function
seedBooks();
