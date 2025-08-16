import apiClient from "@/apiClient";

const loginAPIController = {
    saveParent: async (parent: any) => {
        try {
            const response = await apiClient.post(`/parents/register`, parent);
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            console.error("saveClasses error:", error);
            return null;
        }
    },
};

export default loginAPIController;
