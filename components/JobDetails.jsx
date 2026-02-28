import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useJobs } from '../context/JobContext';
import { useTheme } from '../context/ThemeContext';

// Extracted JobCard component to manage individual image loading errors
const JobCard = ({ item, selected, toggleJobSelection, theme, styles }) => {
    const [imageError, setImageError] = useState(false);
    const initial = item.company_name ? item.company_name.charAt(0).toUpperCase() : 'C';

    // Cloudflare blocks direct requests from the app. We bypass it using an image proxy.
    const proxiedLogoUrl = item.company_logo
        ? `https://images.weserv.nl/?url=${encodeURIComponent(item.company_logo)}`
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
                    <Text style={styles.jobTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.company} numberOfLines={1}>{item.company_name}</Text>
                </View>
            </View>

            <View style={styles.tags}>
                <Text style={styles.tag}>{item.job_type || 'Full-time'}</Text>
                <Text style={styles.tag}>{item.candidate_required_location || 'Remote'}</Text>
                <Text style={styles.tag} numberOfLines={1}>{item.category}</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.selectButton, selected && styles.selectedButton]}
                    onPress={() => toggleJobSelection(item)}
                >
                    <Text style={[styles.buttonText, styles.selectText, selected && styles.selectedText]}>
                        {selected ? '✓ Saved' : 'Save'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.detailsButton]}
                    onPress={() => Linking.openURL(item.url)}
                >
                    <Text style={[styles.buttonText, styles.detailsText]}>Apply Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function JobDetails() {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [limit, setLimit] = useState(20);
    const { toggleJobSelection, isJobSelected } = useJobs();

    const fetchJobs = async (currentLimit) => {
        try {
            const response = await axios.get(`https://remotive.com/api/remote-jobs?limit=${currentLimit}`);
            setJobs(response.data.jobs || []);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchJobs(limit);
    }, [limit]);

    const handleLoadMore = () => {
        if (!loadingMore) {
            setLoadingMore(true);
            setLimit(prevLimit => prevLimit + 20);
        }
    };

    const renderJob = ({ item }) => {
        const selected = isJobSelected(item.id);
        return <JobCard item={item} selected={selected} toggleJobSelection={toggleJobSelection} theme={theme} styles={styles} />;
    };

    const renderFooter = () => (
        <TouchableOpacity
            style={styles.loadMoreButton}
            onPress={handleLoadMore}
            disabled={loadingMore}
        >
            {loadingMore ? (
                <ActivityIndicator color="#ffffff" size="small" />
            ) : (
                <Text style={styles.loadMoreText}>Load More Jobs</Text>
            )}
        </TouchableOpacity>
    );

    if (loading && jobs.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#6c5ce7" />
                <Text style={styles.loadingText}>Loading jobs...</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <View style={styles.pageHeader}>
                <Text style={styles.heading}>Latest Openings</Text>
                <Text style={styles.count}>{jobs.length} remote jobs found</Text>
            </View>
            <FlatList
                data={jobs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderJob}
                ListFooterComponent={renderFooter}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
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
    centered: {
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: theme.textSecondary,
        marginTop: 12,
        fontSize: 15,
    },
    heading: {
        color: theme.text,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    count: {
        color: theme.textSecondary,
        fontSize: 15,
    },
    list: {
        paddingBottom: 20,
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
    selectButton: {
        backgroundColor: 'transparent',
        borderColor: theme.primary,
    },
    selectedButton: {
        backgroundColor: theme.border,
        borderColor: theme.border,
    },
    detailsButton: {
        backgroundColor: theme.primary,
        borderColor: theme.primary,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
    },
    selectText: {
        color: theme.primary,
    },
    selectedText: {
        color: theme.textSecondary,
    },
    detailsText: {
        color: '#ffffff', // Ensure white text on primary background
    },
    loadMoreButton: {
        backgroundColor: theme.surface,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: theme.primary,
    },
    loadMoreText: {
        color: theme.primary,
        fontSize: 16,
        fontWeight: '600',
    },
});
