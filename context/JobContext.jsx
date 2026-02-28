import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const JobContext = createContext();
const STORAGE_KEY = '@selected_jobs';

export const JobProvider = ({ children }) => {
    const [selectedJobs, setSelectedJobs] = useState([]);

    // 1. Load data from AsyncStorage on initial mount
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const savedJobs = await AsyncStorage.getItem(STORAGE_KEY);
                if (savedJobs !== null) {
                    setSelectedJobs(JSON.parse(savedJobs));
                }
            } catch (error) {
                console.error('Failed to load selected jobs from storage:', error);
            }
        };
        loadInitialData();
    }, []);

    // 2. Save data to AsyncStorage whenever selectedJobs changes
    const saveToStorage = async (jobs) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
        } catch (error) {
            console.error('Failed to save selected jobs to storage:', error);
        }
    };

    const toggleJobSelection = (job) => {
        setSelectedJobs((prev) => {
            const isSelected = prev.find((j) => j.id === job.id);
            let newList;
            if (isSelected) {
                newList = prev.filter((j) => j.id !== job.id);
            } else {
                newList = [...prev, job];
            }
            // Save the new list to storage immediately
            saveToStorage(newList);
            return newList;
        });
    };

    const isJobSelected = (jobId) => {
        return selectedJobs.some((j) => j.id === jobId);
    };

    return (
        <JobContext.Provider value={{ selectedJobs, toggleJobSelection, isJobSelected }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => {
    const context = useContext(JobContext);
    if (!context) {
        throw new Error('useJobs must be used within a JobProvider');
    }
    return context;
};
