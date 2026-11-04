const DashboardCard = ({ icon: Icon, title, value, subtitle, bgColor, iconColor, onClick }) => {
  return (
    <div
      className={`card hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
        bgColor || 'bg-white'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        {Icon && (
          <div
            className={`p-3 rounded-lg ${iconColor || 'bg-primary-100'}`}
          >
            <Icon size={24} className={iconColor ? 'text-white' : 'text-primary-600'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
