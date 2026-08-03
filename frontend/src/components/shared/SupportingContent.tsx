import React from "react";

export function SupportingContentFeatures() {
  return (
    <section className="py-16 bg-white dark:bg-[#0B1020] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg dark:prose-invert prose-blue">
        <h2 className="font-display font-bold text-slate-900 dark:text-white">Why Freelancers Need a Dedicated Income Tracker</h2>
        <p className="text-slate-600 dark:text-[#AEB7C6]">
          Managing a freelance business is fundamentally different from a traditional 9-to-5 job. Your income is variable, payments come from multiple clients, and business expenses are inextricably linked to your personal cash flow. An effective <strong>freelance income tracker</strong> must account for delayed invoices, project-based budgeting, and strict tax preparation.
        </p>
        <p className="text-slate-600 dark:text-[#AEB7C6]">
          By utilizing a specialized <strong>freelancer finance app</strong>, you completely eliminate the friction of juggling complicated Google Sheets or generic budgeting tools. Tralance acts as a unified dashboard for your entire freelance cashflow.
        </p>

        <h3 className="font-display font-bold text-slate-900 dark:text-white mt-12">The Power of Offline Expense Tracking</h3>
        <p className="text-slate-600 dark:text-[#AEB7C6]">
          In a world where SaaS applications require constant internet connectivity and monthly subscriptions, an <strong>offline expense tracker</strong> provides unmatched reliability and speed. As a <strong>local database finance app</strong> utilizing SQLite, Tralance ensures your transaction queries execute in milliseconds with zero server latency. You can log expenses on a plane, review income on the subway, and never worry about cloud server outages.
        </p>
      </div>
    </section>
  );
}

export function SupportingContentPrivacy() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-[#111827] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg dark:prose-invert prose-blue">
        <h2 className="font-display font-bold text-slate-900 dark:text-white">Privacy-First Money Management</h2>
        <p className="text-slate-600 dark:text-[#AEB7C6]">
          When choosing an <strong>expense manager app</strong>, privacy should be the primary feature, not an afterthought. The vast majority of financial applications operate by analyzing, aggregating, and frequently monetizing your spending habits. Tralance was built from the ground up to be a completely <strong>privacy focused finance app</strong>.
        </p>
        <p className="text-slate-600 dark:text-[#AEB7C6]">
          Because it is a <strong>local storage finance tracker</strong>, we physically cannot access your data. There are no tracking pixels, no behavioral analytics, and no remote databases harvesting your client list. Your financial sovereignty is guaranteed by the architecture itself.
        </p>
      </div>
    </section>
  );
}
