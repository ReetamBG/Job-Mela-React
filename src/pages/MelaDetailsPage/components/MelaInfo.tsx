import { Badge } from '@/components/ui/badge'
import { formatDate, getDaysRemaining } from '@/lib/dateTime'
import type { Mela } from '@/types'

const MelaInfo = ({mela}: {mela: Mela}) => {
  return (
      <div className="bg-white rounded-xl shadow-card border border-emerald-400 shadow-emerald-600 px-6 py-8">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            {mela.venue_name}
          </h1>
          <p className="text-sm text-gray-600">{mela.district}</p>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm lg:text-base mb-6">
          {mela.melaDesc ?? "No description provided for this mela."}
        </p>

        {/* Time & Venue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-2">
              Dates
            </h3>
            <p className="flex items-center gap-2 text-gray-700 text-sm">
              <i className="bi bi-calendar-event-fill text-gray-900 text-xs"></i>
              {formatDate(mela.start_date)} – {formatDate(mela.end_date)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Ends in {getDaysRemaining(mela.end_date)} days
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-2">
              Location
            </h3>
            <p className="flex items-center gap-2 text-gray-700 text-sm">
              <i className="bi bi-geo-fill text-gray-900 text-xs"></i>
              {mela.address}, {mela.district}
            </p>
            {mela.venueType && (
              <Badge
                variant="outline"
                className="text-emerald-700 border-emerald-500 mt-2"
              >
                {mela.venueType}
              </Badge>
            )}
          </div>
        </div>

        {/* Apply CTA */}
        <div className="mt-8 border-t border-dashed pt-4 flex justify-end gap-4">
          
        </div>
      </div>
  )
}

export default MelaInfo