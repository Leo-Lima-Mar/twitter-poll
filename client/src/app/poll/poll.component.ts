import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { Option } from './models/option.model';
import { Poll } from './models/poll.model';

import { BootstrapConstants } from '../core/constants/bootstrap.contants';
import { ToastService } from '../core/utils/toast.service';
import { PollService } from './poll.service';

interface ChartElement {
    name: string;
    value: number;
}

interface LineChartElement {
    name: string;
    series: ChartElement[];
}

@Component({
    selector: 'app-poll',
    styleUrls: ['./poll.component.scss'],
    templateUrl: './poll.component.html'
})
export class PollComponent implements OnInit {

    public model: Poll = new Poll();
    public rows: Option[] = [];
    public currentPoll: Poll = new Poll();
    public totalVotes: number = 0;

    public pieData: ChartElement[];
    public lineChartData: LineChartElement[];
    public showLegend: boolean = true;
    public chartDimensions: number[] = [0, 0];

    public newOption: Option = new Option();
    public activeTab: string = 'newPollTab';
    public tableCustomMessages: { emptyMessage: string } = {
        emptyMessage: 'Nenhuma opção cadastrada'
    };

    @ViewChild(DatatableComponent) public table: DatatableComponent;

    constructor(
        private readonly pollService: PollService,
        private readonly toastService: ToastService) { }

    public ngOnInit(): void {
        this.getCurrentPoll();
        const searchTimeout: number = 10000;
        setInterval(() => this.getCurrentPoll(), searchTimeout);
        this.resizeWindow();
    }

    public getCurrentPoll(): void {
        this.pollService.getCurrentPoll().subscribe(
            (model: Poll) => this.afterGet(model));
    }

    private afterGet(model: Poll): void {
        if (model) {
            this.currentPoll = model;
            this.activeTab = 'currentPollTab';
            this.resizeWindow();
            this.totalVotes = 0;
            this.currentPoll.options.forEach(
                (option: Option) => this.totalVotes += option.totalVotes);
            this.updatePie(model);
            this.updateLineChart(model);
        }
    }

    private updatePie(model: Poll): void {
        this.pieData = [];
        model.options.forEach((option: Option) =>
            this.pieData.push({
                name: `${option.hashtag}`,
                value: option.totalVotes }
            ));
        this.updateChartsWidth();
    }

    private updateLineChart(model: Poll): void {
        this.lineChartData = [];
        model.options.forEach((option: Option) => {
            const newChartResult: LineChartElement = {
                name: `${option.hashtag}`,
                series: []
            };
            this.updateVotesByHour(option, newChartResult);
            this.lineChartData.push(newChartResult);
        });
    }

    private updateVotesByHour(option: Option, newChartResult: LineChartElement): void {
        let hour: number = new Date().getHours();
        option.votesByHour.forEach(
            (hourVotes: number) => {
                newChartResult.series.unshift(
                    { name: hour.toString(), value: hourVotes });
                hour--;
                if (hour === -1) {
                    const lastHourOfDay: number = 23;
                    hour = lastHourOfDay;
                }
            });
    }

    private updateChartsWidth(): void {
        const defaultHeight: number = 400;
        if (window.innerWidth > BootstrapConstants.WIDTH.LG) {
            this.chartDimensions[0] =
                BootstrapConstants.WIDTH.LG - Math.floor(BootstrapConstants.WIDTH.LG / 3);
            this.chartDimensions[1] = defaultHeight;
        } else {
            this.chartDimensions[0] =
                window.innerWidth - Math.floor(window.innerWidth / 3);
            this.chartDimensions[1] = Math.floor(this.chartDimensions[0] / 2);
        }
        this.showLegend = this.chartDimensions[0] > BootstrapConstants.WIDTH.SM;
    }

    public insertOption(): void {
        if (this.canInsertOption()) {
            this.model.options.push(this.newOption);
            this.newOption = new Option();
            this.rows = [...this.model.options];
        }
    }

    public canInsertOption(): boolean {
        return this.newOption
            && this.newOption.name.length > 0
            && this.newOption.hashtag.length > 0;
    }

    public removeRow(rowIndex: number): void {
        this.model.options.splice(rowIndex);
        this.rows = [...this.model.options];
    }

    public canInsert(): boolean {
        return this.model
            && this.model.name.length > 0
            && this.model.hashtag.length > 0
            && this.model.options.length > 0;
    }

    public insert(): void {
        this.pollService.insert(this.model).subscribe(
            (model: Poll) => this.afterInsert(model));
    }

    private afterInsert(model: Poll): void {
        this.model = new Poll();
        this.rows = [];

        this.afterGet(model);
        this.toastService.success('Enquete criada!');
    }

    public endPoll(): void {
        this.pollService.endPoll().subscribe(() => this.afterEnd());
    }

    private afterEnd(): void {
        this.activeTab = 'newPollTab';
        this.currentPoll = new Poll();
        this.totalVotes = 0;
        this.resizeWindow();
        this.toastService.success('Enquete encerrada!');
    }

    public resizeWindow(delay: number = 100): void {
        // Fixing ngx-datatables bug: columns widths are small until resize event.
        setTimeout(() => window.dispatchEvent(new Event('resize')), delay);
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event: any): void {
        this.updateChartsWidth();
    }

}
