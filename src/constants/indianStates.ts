// State -> Districts map. Covers all Indian states/UTs with their real districts
// so the Report a Problem location step can cascade State -> District automatically.

export interface StateDistricts {
  state: string;
  districts: string[];
}

export const STATE_DISTRICTS: StateDistricts[] = [
  { state: 'Andhra Pradesh', districts: ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'] },
  { state: 'Arunachal Pradesh', districts: ['Papum Pare', 'East Siang', 'West Siang', 'Tawang', 'Lower Subansiri', 'Upper Subansiri', 'Changlang'] },
  { state: 'Assam', districts: ['Kamrup', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Cachar', 'Barpeta', 'Sonitpur', 'Tinsukia'] },
  { state: 'Bihar', districts: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia', 'Nalanda', 'Saran', 'Vaishali', 'Rohtas'] },
  { state: 'Chhattisgarh', districts: ['Raipur', 'Bilaspur', 'Durg', 'Korba', 'Raigarh', 'Rajnandgaon', 'Jagdalpur (Bastar)'] },
  { state: 'Goa', districts: ['North Goa', 'South Goa'] },
  { state: 'Gujarat', districts: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Junagadh', 'Anand', 'Kutch'] },
  { state: 'Haryana', districts: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Hisar', 'Rohtak', 'Karnal', 'Sonipat', 'Yamunanagar'] },
  { state: 'Himachal Pradesh', districts: ['Shimla', 'Kangra', 'Mandi', 'Solan', 'Kullu', 'Una', 'Hamirpur'] },
  { state: 'Jharkhand', districts: ['Ranchi', 'Dhanbad', 'Jamshedpur (East Singhbhum)', 'Bokaro', 'Deoghar', 'Hazaribagh', 'Giridih', 'Gumla', 'Latehar', 'Simdega', 'Palamu', 'Sahibganj'] },
  { state: 'Karnataka', districts: ['Bengaluru Urban', 'Mysuru', 'Belagavi', 'Hubballi-Dharwad', 'Mangaluru (Dakshina Kannada)', 'Kalaburagi', 'Ballari', 'Shivamogga', 'Tumakuru'] },
  { state: 'Kerala', districts: ['Thiruvananthapuram', 'Kochi (Ernakulam)', 'Kozhikode', 'Thrissur', 'Kollam', 'Kannur', 'Alappuzha', 'Palakkad', 'Malappuram'] },
  { state: 'Madhya Pradesh', districts: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Rewa', 'Satna', 'Dewas'] },
  { state: 'Maharashtra', districts: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad', 'Solapur', 'Kolhapur', 'Amravati', 'Nanded'] },
  { state: 'Manipur', districts: ['Imphal East', 'Imphal West', 'Thoubal', 'Bishnupur', 'Churachandpur'] },
  { state: 'Meghalaya', districts: ['East Khasi Hills', 'West Garo Hills', 'Ri Bhoi', 'Jaintia Hills'] },
  { state: 'Mizoram', districts: ['Aizawl', 'Lunglei', 'Champhai', 'Kolasib'] },
  { state: 'Nagaland', districts: ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang'] },
  { state: 'Odisha', districts: ['Khordha (Bhubaneswar)', 'Cuttack', 'Puri', 'Ganjam', 'Sambalpur', 'Balasore', 'Rourkela (Sundargarh)', 'Mayurbhanj'] },
  { state: 'Punjab', districts: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Hoshiarpur'] },
  { state: 'Rajasthan', districts: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Alwar', 'Bharatpur', 'Sikar'] },
  { state: 'Sikkim', districts: ['East Sikkim', 'West Sikkim', 'North Sikkim', 'South Sikkim'] },
  { state: 'Tamil Nadu', districts: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode', 'Vellore'] },
  { state: 'Telangana', districts: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Rangareddy'] },
  { state: 'Tripura', districts: ['West Tripura', 'South Tripura', 'North Tripura', 'Dhalai'] },
  { state: 'Uttar Pradesh', districts: ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Prayagraj', 'Noida (Gautam Buddh Nagar)', 'Bareilly', 'Aligarh', 'Moradabad', 'Saharanpur', 'Gorakhpur', 'Sonbhadra'] },
  { state: 'Uttarakhand', districts: ['Dehradun', 'Haridwar', 'Nainital', 'Udham Singh Nagar', 'Almora'] },
  { state: 'West Bengal', districts: ['Kolkata', 'Howrah', 'Darjeeling', 'Siliguri', 'Asansol', 'Durgapur', 'Malda', 'Murshidabad'] },
  { state: 'Delhi', districts: ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi'] },
  { state: 'Jammu and Kashmir', districts: ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur'] },
  { state: 'Ladakh', districts: ['Leh', 'Kargil'] },
  { state: 'Puducherry', districts: ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'] },
  { state: 'Chandigarh', districts: ['Chandigarh'] },
];

export const INDIAN_STATES: string[] = STATE_DISTRICTS.map((s) => s.state);

export function getDistrictsForState(state: string): string[] {
  return STATE_DISTRICTS.find((s) => s.state === state)?.districts ?? [];
}

export default INDIAN_STATES;
