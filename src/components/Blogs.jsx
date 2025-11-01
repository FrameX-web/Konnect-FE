import React, { useState, useEffect } from "react";
import { Search, Plus, Minus } from "lucide-react";
import BackButton from "./BackButton";

const faqData = [
	{
		id: 1,
		question: "What makes Konnect's packaging eco-friendly?",
		answer:
			"Our packaging is made using biodegradable materials and solvent-free processes, significantly reducing environmental impact.",
	},
	{
		id: 2,
		question: "Are your products suitable for export?",
		answer:
			"Yes, our packaging solutions are certified with ROHS, CE, and ZED—making them ideal for global markets and government tenders.",
	},
	{
		id: 3,
		question: "Can I customize the size and print of the bags?",
		answer:
			"Absolutely. We offer full customization options including size, lamination type, and branding prints to meet your exact requirements.",
	},
	{
		id: 4,
		question: "How long does VCI protection last in your packaging?",
		answer:
			"Depending on the product type, our VCI (Volatile Corrosion Inhibitor) solutions offer protection from 8 months up to 5 years.",
	},
];

const SearchBar = ({ placeholder, searchTerm, setSearchTerm }) => (
	<div className="relative group">
		<div 
			className="rounded-2xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm relative shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-300 focus-within:border-gray-800 focus-within:ring-2 focus-within:ring-gray-800/10 flex items-center px-4"
			style={{
				height: '3.5rem',
				width: '90%',
				maxWidth: '400px'
			}}
		>
			<input
				type="text"
				placeholder={placeholder}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="flex-1 bg-transparent outline-none placeholder-gray-500 placeholder:font-normal pr-4 w-full sm:w-[400px] md:w-[450px] lg:w-[500px] xl:w-[520px] 2xl:w-[540px]"
				style={{
					fontSize: 'clamp(14px, 1.125vw, 18px)',
					color: '#1f2937',
					fontWeight: 500
				}}
			/>
			<div className="w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-200 group-hover:scale-105 flex-shrink-0">
				<Search className="w-5 h-5 text-black" />
			</div>
		</div>
		{searchTerm && (
			<div 
				className="absolute top-full left-0 right-0 mt-1 px-6 transition-opacity duration-200" 
				style={{ 
					fontSize: 'clamp(10px, 0.75vw, 12px)', 
					color: '#6b7280' 
				}}
			>
				{searchTerm.length > 0 ? `Searching for "${searchTerm}"...` : ''}
			</div>
		)}
	</div>
);

const ListItem = ({ id, title, description, isExpanded, onToggle }) => {
	const handleToggle = () => {
		onToggle(id);
	};

	return (
		<div className="flex relative items-start mb-5 group">
			<div className="w-2 h-2 bg-gray-800 rounded-full absolute left-0 top-3 flex-shrink-0 transition-all duration-300 group-hover:bg-gray-600" />
			<div className="flex-1 ml-4 max-w-[518px]">
				<div 
					className="mb-1.5 text-gray-800 cursor-pointer hover:text-gray-600 transition-colors duration-200 select-none" 
					onClick={handleToggle}
					style={{
						fontSize: 'clamp(16px, 1.25vw, 20px)',
						fontWeight: 500
					}}
				>
					{title}
				</div>
				<div 
					className={`text-gray-800 transition-all duration-500 ease-in-out overflow-hidden ${
						isExpanded 
							? 'max-h-96 opacity-100 transform translate-y-0' 
							: 'max-h-0 opacity-0 transform -translate-y-2'
					}`}
					style={{
						transitionProperty: 'max-height, opacity, transform',
						transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
						fontSize: 'clamp(13px, 1vw, 16px)'
					}}
				>
					<div className="pt-1 pb-2">
						{description}
					</div>
				</div>
			</div>
			<div className="relative">
				<button 
					className="w-[42px] h-[42px] bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-800/20" 
					onClick={handleToggle}
					aria-label={isExpanded ? 'Collapse' : 'Expand'}
				>
					<div className="transition-transform duration-300 ease-in-out">
						{isExpanded ? (
							<Minus className="w-6 h-6 text-white" />
						) : (
							<Plus className="w-6 h-6 text-white" />
						)}
					</div>
				</button>
			</div>
		</div>
	);
};

const SectionDivider = () => (
	<div className="mx-0 my-5 h-px bg-gray-800 w-[582px] max-sm:w-full opacity-30" />
);

const ContentSection = ({
	title,
	subtitle,
	description,
	searchPlaceholder,
	items,
	searchTerm,
	setSearchTerm,
	expandedItems,
	onToggle,
}) => {
	const filteredItems = items.filter(item => {
		const searchText = (item.question || '').toLowerCase() + 
			(item.answer || '').toLowerCase();
		return searchText.includes(searchTerm.toLowerCase());
	});

	return (
		<div className="relative z-[2]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
			{/* Desktop Layout */}
			<div className="hidden md:block">
				<div
					className="absolute text-gray-800"
					style={{ 
						fontFamily: 'Krona One, sans-serif',
						fontSize: 'clamp(48px, 4.5vw, 72px)',
						top: '228px',
						left: '816px',
						width: '280px',
						height: '88px'
					}}
				>
					{title}
				</div>
				<div
					className="absolute font-bold text-gray-800"
					style={{ 
						fontFamily: 'Montserrat, sans-serif',
						fontSize: 'clamp(18px, 1.5vw, 24px)',
						top: '310px',
						left: '821px',
						maxWidth: '656px',
						height: '37px'
					}}
				>
					{subtitle}
				</div>
				<div
					className="absolute font-medium text-gray-800 md:w-[450px] lg:w-[500px] xl:w-[430px] 2xl:w-[569px]"
					style={{ 
						fontFamily: 'Montserrat, sans-serif',
						fontSize: 'clamp(16px, 1.25vw, 20px)',
						top: '355px',
						left: '821px',
						lineHeight: '1.5'
					}}
				>
					{description}
				</div>
				<div
					className="absolute md:w-[450px] lg:w-[500px] xl:w-[540px] 2xl:w-[561px]"
					style={{ 
						top: '453px',
						left: '816px'
					}}
				>
					<SearchBar placeholder={searchPlaceholder} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				</div>
				<div
					className="absolute md:w-[500px] lg:w-[550px] xl:w-[580px] 2xl:w-[600px]"
					style={{ 
						top: '427px',
						left: '92px'
					}}
				>
					{filteredItems.map((item, index) => (
						<React.Fragment key={item.id}>
							<ListItem
								id={item.id}
								title={item.question}
								description={item.answer}
								isExpanded={expandedItems[item.id] || false}
								onToggle={onToggle}
							/>
							{index < filteredItems.length - 1 && <SectionDivider />}
						</React.Fragment>
					))}
				</div>
			</div>

			{/* Mobile & Tablet Layout */}
			<div className="block md:hidden mb-12 relative">
				<div className="text-center mb-8 relative z-10">
					<div 
						className="font-bold text-gray-800 pt-4 text-left" 
						style={{ 
							fontFamily: 'Krona One, sans-serif',
							fontSize: 'clamp(28px, 6vw, 40px)'
						}}
					>
						{title}
					</div>
					<div 
						className="font-medium text-gray-800 text-left" 
						style={{ 
							fontFamily: 'Montserrat, sans-serif',
							fontSize: 'clamp(16px, 4vw, 20px)'
						}}
					>
						{subtitle}
					</div>
					<div 
						className="text-gray-800 font-medium mb-6 text-left max-w-[95%]" 
						style={{ 
							fontFamily: 'Montserrat, sans-serif',
							fontSize: 'clamp(10px, 2.5vw, 13px)',
							lineHeight: '1.5'
						}}
					>
						{description}
					</div>
					<div className="flex justify-center mb-6 w-full px-2">
						<div className="w-full max-w-[500px]">
							<SearchBar placeholder={searchPlaceholder} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
						</div>
					</div>
				</div>
				<div className="px-4 relative z-10">
					{filteredItems.map((item, index) => (
						<React.Fragment key={item.id}>
							<ListItem
								id={item.id}
								title={item.question}
								description={item.answer}
								isExpanded={expandedItems[item.id] || false}
								onToggle={onToggle}
							/>
							{index < filteredItems.length - 1 && <div className="mx-0 my-5 h-px bg-gray-800 w-full opacity-30" />}
						</React.Fragment>
					))}
				</div>
			</div>
		</div>
	);
};

function Blogs() {
	const [faqSearchTerm, setFaqSearchTerm] = useState("");
	const [expandedItems, setExpandedItems] = useState({});

	const handleToggle = (id) => {
		setExpandedItems(prev => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	useEffect(() => {
		if (typeof document === 'undefined') return;

		const upsertTag = (selector, createFn) => {
			const existing = document.head.querySelector(selector);
			if (existing) return existing;
			const el = createFn();
			document.head.appendChild(el);
			return el;
		};
		const setMeta = ({ name, property, content }) => {
			const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
			const el = upsertTag(selector, () => {
				const m = document.createElement('meta');
				if (name) m.setAttribute('name', name);
				if (property) m.setAttribute('property', property);
				return m;
			});
			el.setAttribute('content', content);
		};
		const canonicalUrl = (typeof window !== 'undefined' && window.location?.href)
			? window.location.href.split('#')[0]
			: 'https://www.konnectpackaging.com/faq';

		document.title = 'FAQ: VCI Packaging & Corrosion Protection | Konnect Packaging';

		// Canonical
		const canonical = document.head.querySelector('link[rel="canonical"]') || document.createElement('link');
		canonical.setAttribute('rel', 'canonical');
		canonical.setAttribute('href', canonicalUrl);
		if (!canonical.parentElement) document.head.appendChild(canonical);

		// Meta
		setMeta({ name: 'description', content: 'Find quick answers about Konnect Packaging’s VCI packaging, certifications (ROHS, CE, ZED), exports, customization, and protection duration.' });
		setMeta({ name: 'robots', content: 'index,follow' });
		setMeta({ property: 'og:title', content: 'FAQ: VCI Packaging & Corrosion Protection | Konnect Packaging' });
		setMeta({ property: 'og:description', content: 'Answers on eco-friendly materials, exports, customization, and VCI protection duration.' });
		setMeta({ property: 'og:type', content: 'website' });
		setMeta({ property: 'og:url', content: canonicalUrl });
		setMeta({ property: 'og:image', content: '/hero/bg/1.png' });
		setMeta({ name: 'twitter:card', content: 'summary_large_image' });
		setMeta({ name: 'twitter:title', content: 'FAQ: VCI Packaging & Corrosion Protection' });
		setMeta({ name: 'twitter:description', content: 'Konnect Packaging answers about materials, exports, and VCI protection.' });
		setMeta({ name: 'twitter:image', content: '/hero/bg/1.png' });

		// FAQ JSON-LD
		const faqLd = {
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: faqData.map((q) => ({
				'@type': 'Question',
				name: q.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: q.answer
				}
			}))
		};
		let script = document.getElementById('ld-faq');
		if (!script) {
			script = document.createElement('script');
			script.type = 'application/ld+json';
			script.id = 'ld-faq';
			document.head.appendChild(script);
		}
		script.text = JSON.stringify(faqLd);
	}, []);

	return (
		<div className="flex justify-center min-h-screen bg-white pb-8 pt-0 md:pt-0 max-md:pt-20" style={{ fontFamily: 'Montserrat, sans-serif' }}>
			<div className="relative w-[95%] max-w-none overflow-hidden bg-white min-h-[1000px] max-md:p-5 max-md:min-h-[auto] max-sm:max-w-screen-sm max-md:bg-gradient-to-tr max-md:from-[#E9C77F] max-md:to-[#FBE6B7] max-md:rounded-[50px]">
				{/* Back Button */}
				<BackButton />

				{/* Background Elements - Desktop Only */}
				<div className="hidden md:block absolute bg-gradient-to-tr from-[#E9C77F] to-[#FBE6B7] h-[850px] left-[25px] rounded-[343px_0px_344px_0px] top-[114px] w-[calc(100%-50px)]" />

				{/* Background Text - Desktop Only */}
				<div 
					className="hidden md:block absolute text-white/50 text-opacity-50 z-[1]" 
					style={{ 
						fontFamily: 'Krona One, sans-serif',
						fontSize: 'clamp(100px, 9vw, 144px)',
						top: '150px',
						left: '810px',
						width: '462px',
						height: '188px'
					}}
				>
					FAQ
				</div>

				{/* FAQ Section */}
				<ContentSection
					title="FAQ"
					subtitle="QUESTIONS & ANSWERS"
					description="Find quick answers to common questions about our sustainable packaging solutions, certifications, and services."
					searchPlaceholder="Search FAQ here"
					items={faqData}
					searchTerm={faqSearchTerm}
					setSearchTerm={setFaqSearchTerm}
					expandedItems={expandedItems}
					onToggle={handleToggle}
				/>
			</div>
		</div>
	);
}

export default Blogs;