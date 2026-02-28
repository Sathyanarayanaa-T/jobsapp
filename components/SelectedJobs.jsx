import { useState } from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useJobs } from '../context/JobContext';
import { useTheme } from '../context/ThemeContext';

// Extracted JobCard component to manage individual image loading errors
const JobCard = ({ job, toggleJobSelection, theme, styles }) => {
    const [imageError, setImageError] = useState(false);
    const initial = job.company_name ? job.company_name.charAt(0).toUpperCase() : 'C';

    // Cloudflare blocks direct requests from the app. We bypass it using an image proxy.
    const proxiedLogoUrl = job.company_logo
        ? `https://images.weserv.nl/?url=${encodeURIComponent(job.company_logo)}`
        : null;

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.companyLogoPlaceholder}>
                    {proxiedLogoUrl && !imageError ? (
                        <Image
                            source={{ uri: proxiedLogoUrl }}
                            style={styles.companyLogoImage}
                            resizeMode="contain"
                            onError={(e) => {
                                console.log("Image load error:", e.nativeEvent.error);
                                setImageError(true);
                            }}
                        />
                    ) : (
                        <Text style={styles.companyLogoText}>{initial}</Text>
                    )}
                </View>
                <View style={styles.cardTitles}>
                    <Text style={styles.jobTitle} numberOfLines={1}>{job.title}</Text>
                    <Text style={styles.company} numberOfLines={1}>{job.company_name}</Text>
                </View>
            </View>

            <View style={styles.tags}>
                <Text style={styles.tag}>{job.job_type || 'Full-time'}</Text>
                <Text style={styles.tag}>{job.candidate_required_location || 'Remote'}</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.removeButton]}
                    onPress={() => toggleJobSelection(job)}
                >
                    <Text style={[styles.buttonText, styles.removeText]}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.applyButton]}
                    onPress={() => Linking.openURL(job.url)}
                >
                    <Text style={[styles.buttonText, styles.applyText]}>Apply Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function SelectedJobs() {
    const { selectedJobs, toggleJobSelection } = useJobs();
    const { theme } = useTheme();
    const styles = getStyles(theme);

    return (
        <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
            <View style={styles.pageHeader}>
                <Text style={styles.title}>Saved Jobs</Text>
                <Text style={styles.subtitle}>{selectedJobs.length} jobs saved</Text>
            </View>

            {selectedJobs.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No jobs saved yet.</Text>
                </View>
            ) : (
                selectedJobs.map((job) => (
                    <JobCard key={job.id} job={job} toggleJobSelection={toggleJobSelection} theme={theme} styles={styles} />
                ))
            )}
            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const getStyles = (theme) => StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.background,
        paddingHorizontal: 20,
    },
    pageHeader: {
        marginTop: 40,
        marginBottom: 20,
    },
    title: {
        color: theme.text,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subtitle: {
        color: theme.textSecondary,
        fontSize: 15,
    },
    emptyState: {
        paddingVertical: 60,
        alignItems: 'center',
    },
    emptyText: {
        color: theme.textSecondary,
        fontSize: 16,
    },
    card: {
        backgroundColor: theme.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: theme.border,
        shadowColor: theme.isDark ? '#000' : '#ccc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
    },
    companyLogoPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: theme.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        overflow: 'hidden',
    },
    companyLogoImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
    },
    companyLogoText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    cardTitles: {
        flex: 1,
        justifyContent: 'center',
    },
    jobTitle: {
        color: theme.text,
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    company: {
        color: theme.textSecondary,
        fontSize: 14,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    tag: {
        backgroundColor: theme.border,
        color: theme.textSecondary,
        fontSize: 12,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        overflow: 'hidden',
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    removeButton: {
        backgroundColor: 'transparent',
        borderColor: '#ff7675',
    },
    applyButton: {
        backgroundColor: theme.primary,
        borderColor: theme.primary,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
    },
    removeText: {
        color: '#ff7675',
    },
    applyText: {
        color: '#ffffff', // Explicitly want white on the primary button
    },
});
