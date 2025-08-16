import apiClient from "@/apiClient";

const eventAPIController = {
    getAllEventsByGrade: async () => {
        try {
            const response = await apiClient.get(`/events/by-grade`);
            if (response.status === 200 && response.data.state === "OK") {
                return response.data.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
};

export default eventAPIController;
