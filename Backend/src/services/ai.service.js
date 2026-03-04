const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })

    return JSON.parse(response.text)


}



async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: 0, bottom: 0, left: 0, right: 0 }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate a highly professional, single-page resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        CRITICAL INSTRUCTIONS:
                        1. You MUST return a JSON object with a single field "html" containing the raw HTML code.
                        2. The HTML MUST be a complete, self-contained document (<html>, <head>, <body>).
                        3. Design: Create a modern, premium, and clean design (e.g., a two-column layout or a highly structured single-column layout). Use a modern font like 'Inter' or 'Roboto' (import from Google Fonts).
                        4. Color Palette: Use a professional color palette (e.g., Navy Blue, Charcoal Gray, and White).
                        5. SINGLE PAGE STRICTLY: The CSS MUST be designed to fit perfectly on ONE single A4 page. Use concise bullet points. Do not make it verbose.
                        6. Ensure it is ATS-friendly but visually stunning for human recruiters.

                        Include this CSS in the <head> to enforce the single page and styling:
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                            * { box-sizing: border-box; margin: 0; padding: 0; }
                            body { font-family: 'Inter', sans-serif; font-size: 11px; line-height: 1.4; color: #333; background: #fff; width: 210mm; height: 296mm; overflow: hidden; margin: 0 auto; }
                            .resume-container { display: flex; height: 100%; border-top: 8px solid #0f172a; }
                            .left-column { width: 32%; background-color: #f8fafc; padding: 25px 20px; border-right: 1px solid #e2e8f0; }
                            .right-column { width: 68%; padding: 25px 30px; }
                            h1 { font-size: 24px; font-weight: 700; color: #0f172a; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; }
                            h2 { font-size: 14px; font-weight: 600; color: #e1034d; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-top: 15px; }
                            .left-column h2 { border-bottom-color: #cbd5e1; }
                            .contact-info { margin-bottom: 20px; font-size: 10px; color: #475569; }
                            .contact-item { margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
                            .section-content { margin-bottom: 15px; }
                            .job-title { font-weight: 600; font-size: 12px; color: #1e293b; display: flex; justify-content: space-between; }
                            .company { font-weight: 500; color: #64748b; font-size: 11px; margin-bottom: 4px; }
                            ul { padding-left: 15px; margin-bottom: 10px; }
                            li { margin-bottom: 3px; color: #334155; }
                            .skills-list { display: flex; flex-wrap: wrap; gap: 6px; }
                            .skill-tag { background: #e2e8f0; color: #334155; padding: 3px 8px; border-radius: 4px; font-size: 9.5px; font-weight: 500; }
                            p.summary { font-size: 10.5px; color: #475569; text-align: justify; margin-bottom: 15px; }
                        </style>
                        
                        Only output the HTML that utilizes this exact class structure. Condense the candidate's history so it perfectly fits within this A4 dimension without scrolling or overflowing.
                    `

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }