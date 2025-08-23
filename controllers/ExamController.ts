import apiClient from "@/apiClient";

const examAPIController = {
    getAllTermExams: async () => {
        try {
            const response = await apiClient.get(`/exams/grade/term-exams/to-parents`);
            if (response.status === 200 && response.data.state === "OK") {
                return response.data.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
};

export default examAPIController;
