import HTTP from '../http';

/**
 * Retrieve coworkers that are currently present in the open space.
 *
 * @returns Promise<{ lastSeen: string }[]>
 */
export const getCurrentMembers = () => {
    return HTTP.get('/current-members').then(({ data }) => data);
};
