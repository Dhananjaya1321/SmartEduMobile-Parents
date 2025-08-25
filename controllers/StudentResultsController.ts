import apiClient from "@/apiClient";

const studentResultsAPIController = {
    getAllClassStudentsResultsDetails: async () => {
        try {
            const response = await apiClient.get(`/results/student-class/to-parents`);
            if (response.status === 200 && response.data.state === "OK") {
                return response.data.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
    getMyChildData: async (examId:any) => {
        try {
            const response = await apiClient.get(`/results/student-class/my-child/to-parents/${examId}`);
            if (response.status === 200 && response.data.state === "OK") {
                return response.data.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
    getStudentsResultsDetails: async () => {
        try {
            const response = await apiClient.get(`/results/student-report/to-parents`);
            if (response.status === 200 && response.data.state === "OK") {
                return response.data.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
};

export default studentResultsAPIController;
