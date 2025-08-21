import apiClient from "@/apiClient";

const lettersAndCertificatesAPIController = {
    requestLettersAndCertificates: async (payload:any) => {
        try {
            const response = await apiClient.post(`/letters`,payload);
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    },
    getAllAcceptedLettersAndCertificates: async () => {
        try {
            const response = await apiClient.get(`/letters/accepted/to-parents`);
            if (response.status === 200 && response.data.state === "OK") {
                return response.data.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
    getAllPendingLettersAndCertificates: async () => {
        try {
            const response = await apiClient.get(`/letters/pending/to-parents`);
            if (response.status === 200 && response.data.state === "OK") {
                return response.data.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
    getAllRejectedLettersAndCertificates: async () => {
        try {
            const response = await apiClient.get(`/letters/reject/to-parents`);
            if (response.status === 200 && response.data.state === "OK") {
                return response.data.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
};

export default lettersAndCertificatesAPIController;
