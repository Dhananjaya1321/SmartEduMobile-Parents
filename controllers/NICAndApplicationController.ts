import apiClient from "@/apiClient";

const nicAndApplicationAPIController = {
    getAllAcceptedLettersAndCertificates: async () => {
        try {
            const response = await apiClient.get(`/exams-and-nic-applications/to-parents`);
            if (response.status === 200 && response.data.state === "OK") {
                return response.data.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
};

export default nicAndApplicationAPIController;
