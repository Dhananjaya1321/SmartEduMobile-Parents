import apiClient from "@/apiClient";

const homeworksAPIController = {
    getHomeworksToParents: async () => {
        try {
            const response = await apiClient.get(`/homeworks/class/to-parents`);
            if (response.status === 200 && response.data.state === "OK") {
                return response.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
};

export default homeworksAPIController;
