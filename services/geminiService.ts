import { GoogleGenerativeAI } from '@google/generative-ai';
import { allCoursesData } from '@/coursesData/courses';

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error('Google Gemini API key não está definida no arquivo de variáveis de ambiente.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

interface QuestionnaireAnswers {
    [key: string]: {
        question: string;
        answer: string;
    };
}

interface CourseRecommendation {
    slug: string;
    title: string;
    description: string;
    icon: string;
    reason: string; 
}

export async function getPersonalizedRecommendations(
    questionnaireAnswers: QuestionnaireAnswers
): Promise<CourseRecommendation[]> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        const answers = Object.values(questionnaireAnswers)
            .map(item => `${item.question}: ${item.answer}`)
            .join('\n');

        const availableCourses = allCoursesData.map(course => ({
            slug: course.slug,
            title: course.title,
            description: course.description
        }));

        const prompt = `
Você é um assistente de recomendação de cursos. Com base nas preferências do usuário, recomende EXATAMENTE 2 minicursos mais adequados.

PREFERÊNCIAS DO USUÁRIO:
${answers}

CURSOS DISPONÍVEIS:
${JSON.stringify(availableCourses, null, 2)}

INSTRUÇÕES:
1. Analise as preferências do usuário
2. Escolha EXATAMENTE 2 cursos que melhor se alinham com as preferências
3. Para cada curso recomendado, forneça um motivo personalizado (máximo 2 linhas)

IMPORTANTE: Retorne sua resposta APENAS em formato JSON válido, seguindo EXATAMENTE esta estrutura:
{
    "recommendations": [
        {
            "slug": "slug-do-curso",
            "reason": "Motivo personalizado da recomendação"
        },
        {
            "slug": "slug-do-curso-2",
            "reason": "Motivo personalizado da recomendação 2"
        }
    ]
}

NÃO adicione texto antes ou depois do JSON. APENAS o JSON válido.
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        let cleanedText = text.trim();
        cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        const parsed = JSON.parse(cleanedText);

        const recommendations: CourseRecommendation[] = parsed.recommendations
            .slice(0, 2) // garante as 2 recomendações
            .map((rec: any) => {
                const course = allCoursesData.find(c => c.slug === rec.slug);
                if (!course) return null;

                return {
                    slug: course.slug,
                    title: course.title,
                    description: course.description,
                    icon: course.icon,
                    reason: rec.reason
                };
            })
            .filter((rec: CourseRecommendation | null): rec is CourseRecommendation => rec !== null);

        // Se não conseguiu 2 recomendações, completa com cursos aleatórios
        if (recommendations.length < 2) {
            const remaining = 2 - recommendations.length;
            const usedSlugs = recommendations.map(r => r.slug);
            const otherCourses = allCoursesData
                .filter(c => !usedSlugs.includes(c.slug))
                .slice(0, remaining)
                .map(course => ({
                    slug: course.slug,
                    title: course.title,
                    description: course.description,
                    icon: course.icon,
                    reason: 'Curso recomendado para ampliar seus conhecimentos'
                }));

            recommendations.push(...otherCourses);
        }

        return recommendations;

    } catch (error) {
        console.error('Erro ao gerar recomendações:', error);
        
        // retornar 2 cursos aleatórios
        return allCoursesData.slice(0, 2).map(course => ({
            slug: course.slug,
            title: course.title,
            description: course.description,
            icon: course.icon,
            reason: 'Curso popular entre os usuários'
        }));
    }
}