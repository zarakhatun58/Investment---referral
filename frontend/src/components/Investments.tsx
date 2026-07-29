import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useDataStore } from '../stores/dataStore';
import {
  TrendingUp,
  DollarSign,
  Percent,
  CheckCircle,
  Clock,
  XCircle,
  ArrowRight,
  Plus,
} from 'lucide-react';

export interface Plan {
  _id: string;
  name: string;
  description?: string;
  minAmount: number;
  maxAmount: number;
  dailyROI: number;
  durationDays: number;
}

export default function Investments() {
  const { user } = useAuthStore();
  const {
    plans,
    fetchPlans,
    investments,
    fetchInvestments,
    createInvestment,
    isLoading,
    error
  } = useDataStore();
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const selectedPlan =
    plans.find((plan) => plan._id === selectedPlanId) || null;

  useEffect(() => {
    fetchPlans();
    if (user?._id) {
      fetchInvestments();
    }
  }, [user?._id, fetchInvestments]);

console.log("Plans:", plans);
  const openModal = () => {
    setSelectedPlanId("");
    setInvestmentAmount("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlanId("");
    setInvestmentAmount("");
  };

  const handlePlanChange = (planId: string) => {
    setSelectedPlanId(planId);

    const plan = plans.find((p) => p._id === planId);

    if (plan) {
      setInvestmentAmount(plan.minAmount.toString());
    }
  };
  const handleInvest = async () => {
    if (!selectedPlan) return;
    const amount = Number(investmentAmount);
    if (Number.isNaN(amount)) return;
    if (amount < selectedPlan.minAmount) return;
    if (amount > selectedPlan.maxAmount) return;
    try {
      await createInvestment({
        amount,
        planName: selectedPlan.name,
        dailyROI: selectedPlan.dailyROI,
        durationDays: selectedPlan.durationDays,
      });
      await fetchInvestments();
      setShowModal(false);
      setSelectedPlanId("");
      setInvestmentAmount("");
      setSuccessMessage("Investment created successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);

    } catch (error) {
      console.error(error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate).getTime();
    const now = Date.now();

    const days = Math.ceil(
      (end - now) / (1000 * 60 * 60 * 24)
    );

    return days > 0 ? days : 0;
  };

  const getStatusBadge = (status: string) => {
    const STATUS = {
      ACTIVE: {
        icon: CheckCircle,
        className: "bg-emerald-100 text-emerald-700",
        text: "Active",
      },

      COMPLETED: {
        icon: CheckCircle,
        className: "bg-blue-100 text-blue-700",
        text: "Completed",
      },

      CANCELLED: {
        icon: XCircle,
        className: "bg-red-100 text-red-700",
        text: "Cancelled",
      },
    };

    const config =
      STATUS[status.toUpperCase() as keyof typeof STATUS] ||
      STATUS.ACTIVE;

    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.className}`}
      >
        <Icon className="w-4 h-4" />
        {config.text}
      </span>
    );
  };





  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Investments</h1>
          <p className="text-slate-500 mt-1">Choose an investment plan and start earning daily ROI</p>
        </div>
        <button
          onClick={openModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95"
        >
          <Plus className="h-5 w-5" />
          New Investment
        </button>

      </div>
      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <XCircle className="h-5 w-5 text-red-600" />
          <div>
            <p className="font-semibold text-red-700">
              Something went wrong
            </p>
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        </div>
      )}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Investment Plans
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Browse available plans. Click a plan or use the
              <span className="font-semibold text-emerald-600">
                {" "}New Investment
              </span>
              {" "}button to invest.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan._id}
              onClick={() => {
                handlePlanChange(plan._id);
                setShowModal(true);
              }}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {plan.durationDays} Days
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                {plan.name}
              </h3>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">
                    Daily ROI
                  </span>
                  <span className="text-lg font-bold text-emerald-600">
                    {plan.dailyROI}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">
                    Minimum
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(plan.minAmount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">
                    Maximum
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(plan.maxAmount)}
                  </span>
                </div>
              </div>
              <button
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 font-semibold text-white transition-opacity group-hover:opacity-95"
              >
                Invest Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}

        </div>
      </div>
      {/* Success Message */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <p className="text-emerald-700 font-medium">{successMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <XCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  New Investment
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose a plan and investment amount.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <XCircle className="h-6 w-6 text-slate-500" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Investment Plan
                </label>
                <select
                  value={selectedPlanId}
                  onChange={(e) => handlePlanChange(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="">
                    Select Plan
                  </option>

                  {plans.map((plan) => (
                    <option
                      key={plan._id}
                      value={plan._id}
                    >
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedPlan && (
                <div className="grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-5">

                  <div>
                    <p className="text-xs text-slate-500">
                      Daily ROI
                    </p>

                    <p className="mt-1 text-lg font-bold text-emerald-600">
                      {selectedPlan.dailyROI}%
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Duration
                    </p>

                    <p className="mt-1 font-semibold">
                      {selectedPlan.durationDays} Days
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Minimum
                    </p>

                    <p className="mt-1 font-semibold">
                      {formatCurrency(selectedPlan.minAmount)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Maximum
                    </p>

                    <p className="mt-1 font-semibold">
                      {formatCurrency(selectedPlan.maxAmount)}
                    </p>
                  </div>

                </div>
              )}

              {/* Amount */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Investment Amount
                </label>

                <div className="relative">

                  <DollarSign className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) =>
                      setInvestmentAmount(e.target.value)
                    }
                    placeholder="Enter amount"
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                  />

                </div>
              </div>

              {/* Expected Returns */}

              {selectedPlan &&
                investmentAmount &&
                Number(investmentAmount) >= selectedPlan.minAmount && (

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

                    <h4 className="mb-4 font-bold text-emerald-700">
                      Expected Returns
                    </h4>

                    <div className="space-y-3">

                      <div className="flex justify-between">
                        <span>Daily ROI</span>

                        <span className="font-semibold">
                          {formatCurrency(
                            (Number(investmentAmount) *
                              selectedPlan.dailyROI) /
                            100
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span>Total ROI</span>

                        <span className="font-semibold">
                          {formatCurrency(
                            ((Number(investmentAmount) *
                              selectedPlan.dailyROI) /
                              100) *
                            selectedPlan.durationDays
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between border-t border-emerald-200 pt-3">

                        <span className="font-semibold">
                          Total Return
                        </span>

                        <span className="text-lg font-bold text-emerald-700">
                          {formatCurrency(
                            Number(investmentAmount) +
                            ((Number(investmentAmount) *
                              selectedPlan.dailyROI) /
                              100) *
                            selectedPlan.durationDays
                          )}
                        </span>

                      </div>

                    </div>

                  </div>
                )}

              {/* Buttons */}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">

                <button
                  onClick={closeModal}
                  className="flex-1 rounded-xl border border-slate-300 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  onClick={handleInvest}
                  disabled={
                    isLoading ||
                    !selectedPlan ||
                    !investmentAmount ||
                    Number(investmentAmount) <
                    selectedPlan.minAmount ||
                    Number(investmentAmount) >
                    selectedPlan.maxAmount
                  }
                  className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading
                    ? "Creating..."
                    : "Create Investment"}
                </button>

              </div>

            </div>

          </div>
        </div>
      )}
      {/* Investment Plans */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {plans.map((plan: any) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 cursor-pointer group"
              onClick={() => {
                setSelectedPlanId(plan.id);
                setInvestmentAmount(plan.min_amount.toString());
                setShowModal(true);
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  {plan.duration_days} Days
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-800">{plan.name}</h3>
              <p className="text-sm text-slate-500 mt-1 min-h-[40px]">{plan.description}</p>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-emerald-600">{plan.daily_roi_percentage}%</span>
                  <span className="text-slate-500 text-sm">daily ROI</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
                  <span>Min: {formatCurrency(plan.min_amount)}</span>
                  <span>Max: {formatCurrency(plan.max_amount)}</span>
                </div>
              </div>

              <button className="mt-4 w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-medium opacity-90 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                Invest Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* My Investments */}

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              My Investments
            </h2>

            <p className="text-sm text-slate-500">
              Your active and completed investments
            </p>
          </div>
        </div>

        {investments.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">

            <TrendingUp className="mx-auto mb-4 h-16 w-16 text-slate-300" />

            <h3 className="text-lg font-semibold text-slate-700">
              No Investments Yet
            </h3>

            <p className="mt-2 text-slate-500">
              Click the <strong>New Investment</strong> button to create your first investment.
            </p>

          </div>
        ) : (
          <>
            {/* Desktop Table */}

            <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white lg:block">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                      Plan
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                      Daily ROI
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                      Start
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                      End
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map((investment) => (
                    <tr
                      key={investment._id}
                      className="border-t hover:bg-slate-50"
                    >
                      <td className="px-6 py-5 font-semibold text-slate-800">
                        {investment.planName}
                      </td>
                      <td className="px-6 py-5">
                        {formatCurrency(investment.amount)}
                      </td>

                      <td className="px-6 py-5 text-emerald-600 font-semibold">
                        {investment.dailyROI}%
                      </td>
                      <td className="px-6 py-5">
                        {formatDate(investment.startDate)}
                      </td>
                      <td className="px-6 py-5">
                        {formatDate(investment.endDate)}
                      </td>
                      <td className="px-6 py-5">
                        {getStatusBadge(investment.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Cards */}
            <div className="space-y-4 lg:hidden">
              {investments.map((investment) => (
                <div
                  key={investment._id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        {investment.planName}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {formatCurrency(investment.amount)}
                      </p>
                    </div>
                    {getStatusBadge(investment.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">
                        Daily ROI
                      </p>
                      <p className="font-semibold text-emerald-600">
                        {investment.dailyROI}%
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">
                        Start Date
                      </p>

                      <p className="font-semibold">
                        {formatDate(investment.startDate)}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500">
                        End Date
                      </p>

                      <p className="font-semibold">
                        {formatDate(investment.endDate)}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500">
                        Days Left
                      </p>

                      <p className="font-semibold text-cyan-600">
                        {investment.status === "ACTIVE"
                          ? getDaysRemaining(investment.endDate)
                          : 0}{" "}
                        Days
                      </p>
                    </div>

                  </div>

                </div>

              ))}

            </div>
          </>
        )}
      </div>
    </div>
  );
}
