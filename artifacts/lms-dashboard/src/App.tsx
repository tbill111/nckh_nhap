import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AIEvaluation from './pages/AIEvaluation';
import LiveMonitor from './pages/LiveMonitor';
import Classes from './pages/Classes';
import Assignments from './pages/Assignments';
import Settings from './pages/Settings';

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/danh-gia-ai" component={AIEvaluation} />
        <Route path="/giam-sat" component={LiveMonitor} />
        <Route path="/lop-hoc" component={Classes} />
        <Route path="/bai-tap" component={Assignments} />
        <Route path="/cai-dat" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;