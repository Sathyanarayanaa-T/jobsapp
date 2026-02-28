import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useJobs } from '../context/JobContext';
import { useTheme } from '../context/ThemeContext';

export default function Home({ navigation, route }) {
    const { email, name } = route.params || {};
    const { selectedJobs } = useJobs();
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const stats = [
        { label: 'Applied', value: '12' },
        { label: 'Interviews', value: '3' },
        { label: 'Offers', value: '1' },
        { label: 'Saved', value: selectedJobs.length.toString() },
    ];

    return (
        <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hi, {name || email?.split('@')[0]} </Text>
                <Text style={styles.subtitle}>Find your dream job today</Text>
            </View>

            <View style={styles.searchBar}>
                <Text style={styles.searchPlaceholder}>🔍 Search jobs, skills, companies...</Text>
            </View>

            <View style={styles.statsRow}>
                {stats.map((s) => (
                    <View key={s.label} style={styles.statCard}>
                        <Text style={styles.statValue}>{s.value}</Text>
                        <Text style={styles.statLabel}>{s.label}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended for you</Text>
                <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
            </View>

            <View style={styles.jobCard}>
                <View style={styles.jobCardHeader}>
                    <View style={styles.companyLogoPlaceholder}><Text style={styles.companyLogoText}>G</Text></View>
                    <View style={styles.jobCardTitles}>
                        <Text style={styles.jobTitle}>Frontend Developer</Text>
                        <Text style={styles.companyName}>Google • Mountain View, CA</Text>
                    </View>
                </View>
                <View style={styles.jobTags}>
                    <Text style={styles.tag}>Full-time</Text>
                    <Text style={styles.tag}>Remote</Text>
                    <Text style={styles.tag}>$120k - $150k</Text>
                </View>
                <Text style={styles.postedTime}>Posted 2 hours ago</Text>
            </View>

            <View style={styles.jobCard}>
                <View style={styles.jobCardHeader}>
                    <View style={[styles.companyLogoPlaceholder, { backgroundColor: '#ff7675' }]}><Text style={styles.companyLogoText}>A</Text></View>
                    <View style={styles.jobCardTitles}>
                        <Text style={styles.jobTitle}>React Native Engineer</Text>
                        <Text style={styles.companyName}>Airbnb • San Francisco, CA</Text>
                    </View>
                </View>
                <View style={styles.jobTags}>
                    <Text style={styles.tag}>Contract</Text>
                    <Text style={styles.tag}>Hybrid</Text>
                </View>
                <Text style={styles.postedTime}>Posted 1 day ago</Text>
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Top Companies Hiring</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.companiesScroll}>
                {['Microsoft', 'Amazon', 'Netflix', 'Meta'].map((company, index) => (
                    <View key={index} style={styles.companyPill}>
                        <Text style={styles.companyPillText}>{company}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const getStyles = (theme) => StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.background,
        padding: 20,
    },
    header: {
        marginTop: 40,
        marginBottom: 20,
    },
    greeting: {
        color: theme.text,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subtitle: {
        color: theme.textSecondary,
        fontSize: 16,
    },
    searchBar: {
        backgroundColor: theme.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: theme.border,
    },
    searchPlaceholder: {
        color: theme.textSecondary,
        fontSize: 15,
    },
    statsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    statCard: {
        backgroundColor: theme.surface,
        width: '48%',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.border,
        shadowColor: theme.isDark ? '#000' : '#ccc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    statValue: {
        color: theme.primary,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statLabel: {
        color: theme.textSecondary,
        fontSize: 14,
        fontWeight: '500',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 16,
    },
    sectionTitle: {
        color: theme.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    seeAll: {
        color: theme.primary,
        fontSize: 14,
        fontWeight: '600',
    },
    jobCard: {
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
    jobCardHeader: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    companyLogoPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: theme.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    companyLogoText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    jobCardTitles: {
        flex: 1,
        justifyContent: 'center',
    },
    jobTitle: {
        color: theme.text,
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    companyName: {
        color: theme.textSecondary,
        fontSize: 14,
    },
    jobTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
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
    postedTime: {
        color: theme.textSecondary,
        fontSize: 12,
        marginTop: 4,
    },
    companiesScroll: {
        marginBottom: 20,
    },
    companyPill: {
        backgroundColor: theme.surface,
        borderWidth: 1,
        borderColor: theme.border,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 12,
    },
    companyPillText: {
        color: theme.text,
        fontSize: 14,
        fontWeight: '500',
    },
});
