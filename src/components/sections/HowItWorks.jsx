import React, { useEffect, useRef, useState } from 'react'
import SectionSubtitle from '../SectionSubtitle'
import SectionTitle from '../SectionTitle'
import LinkButton from '../LinkButton'
import { motion, useScroll } from 'framer-motion'

const TABS_DATA = [
	{
		id: '1',
		title: 'Bulk upload 100s of PDF documents',
		text: 'Risus facilisis pellentesque dapibus at est nunc duis nunc. Sed scelerisque tincidunt magna',
		imageUrl: '/tab-1-full.webp',
	},
	{
		id: '2',
		title: 'GPT4 turbo will process your documents',
		text: 'Ask questions, extract information, and summarize everything with our advanced and friendly AI.',
		imageUrl: '/tab-2-full.webp',
	},
	{
		id: '3',
		title: 'Ask questions and chat with documents',
		text: 'With the AI-generated output, you can quickly extract important data, navigate through the document with smart search.',
		imageUrl: '/tab-3-full.webp',
	},
]
const HowItWotks = () => {
	const [activeTab, setActiveTab] = useState(0)
	const sectionRef = useRef(null)
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start start', 'end end'],
	})

	useEffect(() => {
		return scrollYProgress.on('change', (progress) => {
			const nextTab = Math.floor(progress * TABS_DATA.length)
			if (nextTab <= 2) {
				setActiveTab(nextTab)
			}
		})
	}, [scrollYProgress])
	return (
		<section ref={sectionRef} className="realtive min-h-[160vh]">
			<div className="container sticky top-20">
				<SectionSubtitle>How It Works </SectionSubtitle>
				<div className="mt-3 grid grid-cols-1 gap-2 md:mt-4 md:grid-cols-2 lg:gap-10">
					<div>
						<SectionTitle>Easy step transforming your documents</SectionTitle>
					</div>
					<motion.div
						initial={{
							y: 50,
						}}
						whileInView={{
							y: 0,
						}}
						transition={{
							duration: 0.5,
						}}
						viewport={{ once: true, margin: '-100px' }}
						className="space-y-4 md:space-y-6"
					>
						<p>
							Our process is designed to be simple and efficient, allowing you
							to unlock the full potential of your PDFs with minimal effort.
						</p>

						<LinkButton href={'/'} type="gradient">
							Upload Your PDF
						</LinkButton>
					</motion.div>
				</div>

				<div className="mt-6 md:mt-10 lg:mt-20">
					<div className="relative">
						<div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:gap-20">
							<div className="flex items-center justify-center overflow-hidden rounded-2xl bg-greyscale-10">
								<img
									className="h-auto w-full max-w-full"
									src={TABS_DATA[activeTab].imageUrl}
									alt={`Image for ${TABS_DATA[activeTab].title}`}
								/>
							</div>

							<ul>
								{TABS_DATA.map((tab, idx) => (
									<motion.li
										initial={{
											y: 50,
											opacity: 0,
										}}
										whileInView={{
											y: 0,
											opacity: 1,
										}}
										transition={{
											delayChildren: 1,
											staggerChildren: 2,
										}}
										viewport={{ once: true, margin: '-50px' }}
										key={tab.id}
										className="group relative z-10 overflow-hidden pb-4 last:pb-0 lg:pb-14"
									>
										<img
											src="/dotter-line.svg"
											alt="dotted line"
											className="absolute left-4 top-10 -z-10 h-auto group-last:hidden"
										/>
										<button
											className={`flex gap-3 text-left`}
											// onClick={() => setActiveTab(idx)}
										>
											<span
												className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-greyscale-200 bg-white text-center font-semibold text-greyscale-950 ${activeTab === idx && 'border-primary-600 !bg-primary-600 text-white'}`}
											>
												{idx + 1}
											</span>
											<div className="md:space-y-2">
												<h3 className="text-lg font-semibold tracking-[-0.71px] text-greyscale-900 md:text-2xl">
													{tab.title}
												</h3>
												<p className="text-[#5D5D5D]">{tab.text}</p>
											</div>
										</button>
									</motion.li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HowItWotks
