// Example controller for business logic (can be expanded)
export function formatUser(user) {
  // Add custom formatting or business logic here
  return {
    ...user,
    displayName: `${user.first_name} ${user.last_name}`
  };
}
