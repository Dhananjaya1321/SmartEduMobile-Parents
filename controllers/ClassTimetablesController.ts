import apiClient from "@/apiClient";

const classTimetablesAPIController = {
    findTimetableToParent: async () => {
        try {
            const response = await apiClient.get(`/timetables/to-parents`);
            if (response.status === 200 && response.data.state === "OK") {
                return response.data.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
};

export default classTimetablesAPIController;
