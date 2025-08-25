import apiClient from "@/apiClient";

const studentAPIController = {
    getAchievementsByStudentId: async (id: any) => {
        try {
            const response = await apiClient.get(`/achievements/student/${id}`);
            if (response.status === 200 && response.data.state === "OK") {
                return response.data.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
};

export default studentAPIController;
