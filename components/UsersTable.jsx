import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const USERS = [
    { id: '1', name: 'User 1', age: 25 },
    { id: '2', name: 'User 2', age: 30 },
    { id: '3', name: 'User 3', age: 22 },
];

export default function UsersTable({ navigation }) {
    return (
        <View style={styles.screen}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.goBack}>← Go Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Users</Text>

            <View style={[styles.row, styles.header]}>
                <Text style={[styles.cell, styles.headerText]}>Name</Text>
                <Text style={[styles.cell, styles.headerText]}>Age</Text>
            </View>

            {USERS.map((user) => (
                <View key={user.id} style={styles.row}>
                    <Text style={[styles.cell, styles.cellText]}>{user.name}</Text>
                    <Text style={[styles.cell, styles.cellText]}>{user.age}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#1a1a2e',
        padding: 20,
        paddingTop: 60,
    },
    goBack: {
        color: '#a29bfe',
        fontSize: 16,
        marginBottom: 20,
    },
    title: {
        color: '#e0e0e0',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#2d2d44',
    },
    header: {
        backgroundColor: '#16213e',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cell: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    headerText: {
        color: '#a29bfe',
        fontWeight: '700',
        fontSize: 16,
    },
    cellText: {
        color: '#d1d1e0',
        fontSize: 15,
    },
});
