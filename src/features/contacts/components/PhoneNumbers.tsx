import { CheckBadgeIcon } from "@heroicons/react/20/solid"
import { IPhoneNumber } from "../types"

interface IPhoneNumberProps {
	data: IPhoneNumber[]
}

const PhoneNumbers = ({ data }: IPhoneNumberProps): JSX.Element => {
	return (
		<div className="">
			<div className="px-4 sm:px-0">
				<h3 className=" text-sm leading-7 text-gray-400">Phone Numbers</h3>
			</div>
			<div className=" border-t border-gray-100 w-full">
				<dl className="divide-y divide-gray-100">
					{
						data.map((phone) => (
							<div key={'phone-numbers-' + phone.id} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
								<dt className="text-sm font-medium leading-6 text-gray-900 capitalize">{phone.type}</dt>
								<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex items-center">

									{
										!phone.registered ? <CheckBadgeIcon className="h-4 w-4 text-green-500" /> : null
									}
									&nbsp;

									<span className="text-gray-900">{phone.sim_number}</span>
								</dd>
							</div>
						))
					}
				</dl>
			</div>
		</div>
	)
}


export default PhoneNumbers
