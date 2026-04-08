const dataset = [
    {
        company: "Epik",
        sector: "Quick Commerce",
        stage: "Early Growth",
        team: "Small",
        budget: "Low",
        contrarian: true,
        indiaIntegration: "Delhivery / Shiprocket APIs",
        reasoning: "Shopify reduces backend complexity allowing focus on logistics-heavy operations.",
        devTips: "Focus on logistics APIs first. Avoid building custom checkout early.",
        stack: {
            hosting: "Shopify Plus",
            frontend: "React",
            backend: "Node.js (Middleware)",
            db: "Shopify Storefront API",
            payments: "Razorpay"
        },
        priceRange: "₹1.95L - ₹2.5L",
        redFlag: "High transaction fees due to Shopify revenue share.",
        sources: [
            "https://shopify.engineering",
            "https://razorpay.com/docs/",
            "https://www.delhivery.com/developer/"
        ]
    },
    {
        company: "Hastee",
        sector: "Fintech (EWA)",
        stage: "Early Stage",
        team: "Small",
        budget: "Medium",
        contrarian: false,
        indiaIntegration: "Zeta / Payroll APIs",
        reasoning: "Java backend ensures accuracy and scalability for financial systems.",
        devTips: "Use compiled backend for fintech. Avoid JS-heavy financial logic.",
        stack: {
            hosting: "AWS (Mumbai)",
            frontend: "React Native",
            backend: "Java Spring Boot",
            db: "PostgreSQL (RDS)",
            payments: "Bank APIs"
        },
        priceRange: "₹4L - ₹5L",
        redFlag: "NAT Gateway costs spike during peak loads.",
        sources: [
            "https://aws.amazon.com/blogs/architecture/",
            "https://aws.amazon.com/rds/postgresql/pricing/",
            "https://opinov8.com/portfolios/hastee-microservices-architecture/"
        ]
    },
    {
        company: "Practo",
        sector: "Healthtech",
        stage: "Scale",
        team: "Large",
        budget: "High",
        contrarian: false,
        indiaIntegration: "ABDM / FHIR APIs",
        reasoning: "Healthcare requires compliance-first architecture with structured data.",
        devTips: "Focus on compliance and data structuring early.",
        stack: {
            hosting: "AWS HealthLake",
            frontend: "Next.js",
            backend: "Java + Python",
            db: "DynamoDB / S3",
            payments: "PhonePe"
        },
        priceRange: "₹60L+",
        redFlag: "High compliance overhead and data complexity.",
        sources: [
            "https://blog.practo.com/",
            "https://aws.amazon.com/healthlake/pricing/",
            "https://abdm.gov.in/"
        ]
    },
    {
        company: "Cult.fit",
        sector: "Health & Fitness",
        stage: "Pre-IPO",
        team: "Mid-Large",
        budget: "High",
        contrarian: true,
        indiaIntegration: "Aadhaar / DigiLocker",
        reasoning: "Switch to Java improves performance drastically at scale.",
        devTips: "Plan backend scaling early if expecting high RPS.",
        stack: {
            hosting: "AWS + E2E Networks",
            frontend: "Flutter",
            backend: "Java",
            db: "MongoDB Atlas",
            payments: "Razorpay"
        },
        priceRange: "₹1.2Cr+",
        redFlag: "Migration complexity from Node to Java.",
        sources: [
            "https://blog.cult.fit/",
            "https://www.mongodb.com/developer/",
            "https://www.e2enetworks.com/pricing"
        ]
    },
    {
        company: "SaaS Startup",
        sector: "SaaS",
        stage: "MVP",
        team: "Small",
        budget: "Low",
        contrarian: true,
        indiaIntegration: "Razorpay Subscriptions",
        reasoning: "Firebase eliminates backend overhead for rapid MVP launch.",
        devTips: "Ship fast. Avoid backend complexity.",
        stack: {
            hosting: "Vercel",
            frontend: "Next.js",
            backend: "Firebase",
            db: "Firestore",
            payments: "Razorpay"
        },
        priceRange: "₹2K - ₹8K",
        redFlag: "Vendor lock-in risk at scale.",
        sources: [
            "https://vercel.com/blog",
            "https://firebase.google.com/docs",
            "https://razorpay.com/docs/"
        ]
    },
    {
        company: "Paytm",
        sector: "Fintech",
        stage: "Public",
        team: "Large",
        budget: "Very High",
        contrarian: false,
        indiaIntegration: "UPI / GST / Soundbox",
        reasoning: "Hybrid infra ensures massive scalability and redundancy.",
        devTips: "At scale, focus on cost optimization and observability.",
        stack: {
            hosting: "AWS + Azure",
            frontend: "Flutter",
            backend: "Java",
            db: "MySQL (Sharded)",
            payments: "Internal Gateway"
        },
        priceRange: "₹3Cr+",
        redFlag: "Infrastructure cost explosion risk.",
        sources: [
            "https://paytm.com/document/ir/",
            "https://aws.amazon.com/blogs/architecture/",
            "https://razorpay.com/blog/"
        ]
    }
];

function getStageMessage(stage) {
    if (stage === "MVP") {
        return "Focus on speed. Avoid over-engineering. Validate idea first.";
    }
    if (stage === "Early Growth" || stage === "Early Stage") {
        return "Start structuring your system. Monitor costs and stability.";
    }
    return "Optimize performance and cost. Scale efficiently.";
}

function findBestMatch(input) {
    let best = null;
    let maxScore = -1;

    dataset.forEach(d => {
        let score = 0;
        if (d.sector === input.sector) score += 3;
        if (d.stage === input.stage) score += 2;
        if (d.budget === input.budget) score += 2;
        if (d.team === input.team) score += 1;

        if (score > maxScore) {
            maxScore = score;
            best = d;
        }
    });

    return best;
}

document.getElementById('generateBtn').addEventListener('click', function () {
    const input = {
        stage: document.getElementById('stage').value,
        team: document.getElementById('team').value,
        budget: document.getElementById('budget').value,
        sector: document.getElementById('sector').value
    };

    document.getElementById('view-config').style.display = 'none';
    document.getElementById('loading-overlay').style.display = 'flex';

    setTimeout(() => {
        const match = findBestMatch(input);
        renderReport(match, input.stage);
        document.getElementById('loading-overlay').style.display = 'none';
        document.getElementById('view-report').style.display = 'block';
    }, 1200);
});

function renderReport(data, stage) {
    const container = document.getElementById('report-content');

    container.innerHTML = `
        <div class="report-grid">
            <div class="main-card">
                <span class="section-title">Tech Stack</span>
                <h1>${data.company}</h1>
                ${data.contrarian ? `<div class="contrarian-tag">CONTRARIAN</div>` : ""}

                <div class="tech-grid">
                    <div class="tech-item"><small>Hosting</small><strong>${data.stack.hosting}</strong></div>
                    <div class="tech-item"><small>Frontend</small><strong>${data.stack.frontend}</strong></div>
                    <div class="tech-item"><small>Backend</small><strong>${data.stack.backend}</strong></div>
                    <div class="tech-item"><small>Database</small><strong>${data.stack.db}</strong></div>
                    <div class="tech-item"><small>Payments</small><strong>${data.stack.payments}</strong></div>
                    <div class="tech-item"><small>India Integration</small><strong>${data.indiaIntegration}</strong></div>
                </div>

                <div class="dev-suggestion">
                    <span class="section-title">Reasoning</span>
                    <p>${data.reasoning}</p>
                </div>

                <div class="dev-suggestion">
                    <span class="section-title">Founder Insight</span>
                    <p>${getStageMessage(stage)}</p>
                </div>
            </div>

            <div class="sidebar">
                <div class="side-box">
                    <span class="section-title">Estimated Cost</span>
                    <span class="price-tag">${data.priceRange}</span>
                </div>

                <div class="side-box" style="border-color: var(--accent)">
                    <span class="section-title">Red Flag</span>
                    <p>${data.redFlag}</p>
                </div>

                <div class="side-box">
                    <span class="section-title">Sources</span>
                    ${data.sources.map(s => `<a href="${s}" target="_blank" style="display:block;color:var(--accent);margin-bottom:8px;">${s}</a>`).join('')}
                </div>
            </div>
        </div>
    `;
}