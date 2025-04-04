
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Package, 
  Trash2, 
  BarChart2, 
  Clock, 
  FileDown, 
  Menu, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const NavItem = ({ to, icon: Icon, label, isCollapsed }: NavItemProps) => (
  <NavLink 
    to={to}
    className={({ isActive }) => cn(
      'flex items-center gap-3 rounded-md px-3 py-2 transition-all duration-200',
      isActive 
        ? 'bg-accent text-primary' 
        : 'hover:bg-accent/50 text-muted-foreground hover:text-primary',
      isCollapsed && 'justify-center px-0'
    )}
  >
    <Icon size={20} />
    {!isCollapsed && <span>{label}</span>}
  </NavLink>
);

const Sidebar = () => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/cargo', icon: Package, label: 'Cargo Management' },
    { to: '/waste', icon: Trash2, label: 'Waste Management' },
    { to: '/storage', icon: BarChart2, label: 'Storage Efficiency' },
    { to: '/logs', icon: Clock, label: 'Activity Logs' },
    { to: '/import-export', icon: FileDown, label: 'Import/Export' },
  ];

  return (
    <div 
      className={cn(
        'h-full bg-card transition-all duration-300 border-r border-border flex flex-col',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {!isCollapsed && (
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            Orbit Cargo
          </h1>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? <Menu size={18} /> : <X size={18} />}
        </Button>
      </div>

      {!isCollapsed && (
        <div className="px-4 py-2 mb-6">
          <p className="text-xs text-muted-foreground">Welcome,</p>
          <p className="font-semibold">{user?.name}</p>
          <p className="text-xs capitalize text-muted-foreground">{user?.role}</p>
        </div>
      )}

      <nav className="flex-1 px-2 py-2 space-y-1">
        {navItems.map((item) => (
          <NavItem 
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <div className={cn(
        'p-4 flex items-center gap-2 bg-accent/50 mt-auto',
        isCollapsed && 'justify-center'
      )}>
        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
          {user?.name.charAt(0)}
        </div>
        {!isCollapsed && (
          <div className="truncate">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
