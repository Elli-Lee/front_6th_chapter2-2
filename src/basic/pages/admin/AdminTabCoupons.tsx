import type { Coupon } from "../../../types"
import { IconAdd } from "../../components/icons/IconAdd"
import { AdminCouponForm } from "./AdminCouponForm"
import { AdminCouponView } from "./AdminCouponView"

export function AdminTabCoupons({
  coupons,
  handleCouponDelete,
  setShowCouponForm,
  showCouponForm,
  handleCouponSubmit,
  couponForm,
  setCouponForm,
  handleNotificationAdd,
}: {
  coupons: Coupon[]
  handleCouponDelete: (couponCode: string) => void
  setShowCouponForm: (show: boolean) => void
  showCouponForm: boolean
  handleCouponSubmit: (e: React.FormEvent) => void
  couponForm: { name: string; code: string; discountType: "amount" | "percentage"; discountValue: number }
  setCouponForm: (form: { name: string; code: string; discountType: "amount" | "percentage"; discountValue: number }) => void
  handleNotificationAdd: (message: string, type: "error" | "success" | "warning") => void
}) {
  return (
    <section className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">쿠폰 관리</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coupons.map((coupon) => (
            <AdminCouponView key={coupon.code} coupon={coupon} handleCouponDelete={handleCouponDelete} />
          ))}

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center hover:border-gray-400 transition-colors">
            <button
              className="text-gray-400 hover:text-gray-600 flex flex-col items-center"
              onClick={() => setShowCouponForm(!showCouponForm)}
            >
              <IconAdd />
              <p className="mt-2 text-sm font-medium">새 쿠폰 추가</p>
            </button>
          </div>
        </div>

        {showCouponForm && (
          <AdminCouponForm
            handleCouponSubmit={handleCouponSubmit}
            couponForm={couponForm}
            setCouponForm={setCouponForm}
            handleNotificationAdd={handleNotificationAdd}
            setShowCouponForm={setShowCouponForm}
          />
        )}
      </div>
    </section>
  )
}
