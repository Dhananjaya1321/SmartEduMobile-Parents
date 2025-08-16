import apiClient from "@/apiClient";

const studentAPIController = {
    findStudentToParent: async () => {
        try {
            const response = await apiClient.get(`/students/to-parents`);
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
