// API Service for Envision Backend

const API_BASE_URL = 'http://localhost:5000/api';

export interface Event {
    id: number;
    name: string;
    description: string | null;
    fee: number;
    type: 'Technical' | 'Non-Technical';
    isMegaEvent: number;
    department: string;
}

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    image_url: string;
    team_name: string;
}

/**
 * Fetch all events from the backend
 */
export async function fetchEvents(): Promise<Event[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/events`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const events = await response.json();
        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}

/**
 * Fetch team members
 */
export async function fetchTeamMembers(): Promise<TeamMember[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/team`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const team = await response.json();
        return team;
    } catch (error) {
        console.error('Error fetching team:', error);
        throw error;
    }
}
