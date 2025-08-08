import { useState } from "react"
import type { Coupon } from "../../../types"
import { IconAdd } from "../../components/icons/IconAdd"
import { AdminCouponForm } from "./AdminCouponForm"
import { AdminCouponView } from "./AdminCouponView"

export function AdminTabCoupons({
  coupons,
  setCoupons,
  selectedCoupon,
  setSelectedCoupon,
  handleNotificationAdd,
}: {
  coupons: Coupon[]
  selectedCoupon: Coupon | null
  setCoupons: (coupons: Coupon[] | ((prev: Coupon[]) => Coupon[])) => void
  setSelectedCoupon: React.Dispatch<React.SetStateAction<Coupon | null>>
  handleNotificationAdd: (message: string, type: "error" | "success" | "warning") => void
}) {
  const [showCouponForm, setShowCouponForm] = useState(false)
  const [couponForm, setCouponForm] = useState({
    name: "",
    code: "",
    discountType: "amount" as "amount" | "percentage",
    discountValue: 0,
  })

  function handleCouponAdd(newCoupon: Coupon) {
    const existingCoupon = coupons.find((c) => c.code === newCoupon.code)
    if (existingCoupon) {
      handleNotificationAdd("이미 존재하는 쿠폰 코드입니다.", "error")
      return
    }

    setCoupons((prev) => [...prev, newCoupon])
    handleNotificationAdd("쿠폰이 추가되었습니다.", "success")
  }

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCouponAdd(couponForm)
    setCouponForm({
      name: "",
      code: "",
      discountType: "amount",
      discountValue: 0,
    })
    setShowCouponForm(false)
  }

  return (
    <section className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">쿠폰 관리</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coupons.map((coupon) => (
            <AdminCouponView
              key={coupon.code}
              coupon={coupon}
              setCoupons={setCoupons}
              selectedCoupon={selectedCoupon}
              setSelectedCoupon={setSelectedCoupon}
              handleNotificationAdd={handleNotificationAdd}
            />
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
