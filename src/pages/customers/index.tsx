import { mdiAccountGroup, mdiAccountPlus } from "@mdi/js";
import Button from "components/Button";
import CardBox from "components/CardBox";

import SectionMain from "components/Section/Main";
import SectionTitleLineWithButton from "components/Section/TitleLineWithButton";
import CustomersTable from "components/Table/CustomersTable";
import Head from "next/head"
import { getPageTitle } from "src/config"

const CustomersOverviewPage = () => {
    return (
        <>
            <Head>
                <title>{getPageTitle('Customers overview')}</title>
            </Head>
            <SectionMain>
                <SectionTitleLineWithButton icon={mdiAccountGroup} title="Customers overview" main>
                    <Button
                        href="/customers/add/customer"
                        // target="_blank"
                        icon={mdiAccountPlus}
                        label="Add new customer"
                        color="contrast"
                        roundedFull
                        small
                    />
                </SectionTitleLineWithButton>
                <CardBox className="mb-6" hasTable>
                    <CustomersTable />
                </CardBox>
            </SectionMain>
        </>);
}

export default CustomersOverviewPage