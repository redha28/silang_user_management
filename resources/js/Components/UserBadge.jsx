export default function UserBadge({ role }) {
    const badgeClasses = {
        admin: "bg-red-100 text-red-800 border border-red-300",
        user: "bg-blue-100 text-blue-800 border border-blue-300",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeClasses[role] || "bg-gray-100 text-gray-800"}`}>
            {role}
        </span>
    );
}
