import apiClient from "@/apiClient";

const alAdmissionAPIController = {
    searchSchoolsToParentsCanApplyForALs: async (schoolName: any) => {
        try {
            const response = await apiClient.get(`/schools/al-apply-admission/to-parents/${schoolName}`);
            if (response.status === 200 && response.data.state === "OK") {
                return response.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
    getAllSchoolsToParentsCanApplyForALs: async () => {
        try {
            const response = await apiClient.get(`/schools/al-apply-admission/to-parents`);
            if (response.status === 200 && response.data.state === "OK") {
                return response.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
    applySchoolsToParentsForALs: async (payload:any) => {
        try {
            const response = await apiClient.post(`/schools/al-apply-admission/to-parents`, payload);
            if (response.status === 200) {
                return response.data;
            } else {
                return response.data.message;
            }
        } catch (error) {
            return null;
        }
    },
};

export default alAdmissionAPIController;
