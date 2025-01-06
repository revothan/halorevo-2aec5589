import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, DollarSign, Link, ListOrdered } from "lucide-react";
import Navbar from "@/components/Navbar";

interface AffiliateProfile {
  id: string;
  referral_code: string;
  status: string;
  approved_at: string | null;
}

interface AffiliateOrder {
  id: string;
  customer_email: string;
  amount: number;
  commission_amount: number;
  status: string;
  created_at: string;
}

const AffiliateDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<AffiliateProfile | null>(null);
  const [orders, setOrders] = useState<AffiliateOrder[]>([]);
  const { session } = useSessionContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!session) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch affiliate profile
        const { data: profileData, error: profileError } = await supabase
          .from("affiliate_profiles")
          .select("*")
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch orders if profile exists
        if (profileData) {
          const { data: ordersData, error: ordersError } = await supabase
            .from("affiliate_orders")
            .select("*")
            .order("created_at", { ascending: false });

          if (ordersError) throw ordersError;
          setOrders(ordersData || []);
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session, navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rich-gold" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto glass-card p-8 text-center">
            <h1 className="text-3xl font-bold text-rich-gold mb-6">
              Not an Affiliate Yet?
            </h1>
            <p className="text-rich-gold/80 mb-6">
              Join our affiliate program and start earning commissions today!
            </p>
            <Button onClick={() => navigate("/affiliate/signup")}>
              Become an Affiliate
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const totalCommission = orders.reduce((sum, order) => sum + order.commission_amount, 0);
  const pendingCommission = orders
    .filter((order) => order.status === "pending")
    .reduce((sum, order) => sum + order.commission_amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <Link className="w-8 h-8 text-rich-gold" />
                <div>
                  <p className="text-sm text-rich-gold/70">Your Referral Code</p>
                  <p className="text-xl font-mono text-rich-gold">
                    {profile.referral_code}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <DollarSign className="w-8 h-8 text-rich-gold" />
                <div>
                  <p className="text-sm text-rich-gold/70">Total Commission</p>
                  <p className="text-xl font-mono text-rich-gold">
                    ${totalCommission.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <ListOrdered className="w-8 h-8 text-rich-gold" />
                <div>
                  <p className="text-sm text-rich-gold/70">Pending Commission</p>
                  <p className="text-xl font-mono text-rich-gold">
                    ${pendingCommission.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-rich-gold mb-6">Recent Orders</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        {new Date(order.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{order.customer_email}</TableCell>
                      <TableCell>${order.amount.toFixed(2)}</TableCell>
                      <TableCell>${order.commission_amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "completed"
                              ? "bg-green-500/20 text-green-500"
                              : "bg-yellow-500/20 text-yellow-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                  {orders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-rich-gold/70">
                        No orders yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;